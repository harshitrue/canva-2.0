import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Button } from '@/components/ui/button';
import { FabricImage } from 'fabric';
import ImageKit from 'imagekit';
import { ImageUp, Loader } from 'lucide-react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function CustomImageUpload({ selectedAi }) {
    const [image, setImage] = useState('https://ik.imagekit.io/tubeguruji/j978bsz2r4nse59v7f7rdkdxw17cy63z_QkF9hAkaH.png');
    const [loading, setLoading] = useState(false);
    const { designId } = useParams();
    const { canvasEditor } = useCanvasHook();

    var imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });

    const onImageUpload = async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const imageRef = await imagekit.upload({
            file: file,
            fileName: designId + ".png",
            isPublished: true
        });
        console.log(imageRef?.url);
        // const imageUrl = URL.createObjectURL(file);
        setImage(imageRef?.url);

        setLoading(false);

    }

    const onAddToCanvas = async () => {
        const canvasImageRef = await FabricImage.fromURL(
            image,
            {
                crossOrigin: 'anonymous'
            }
        )
        canvasEditor.add(canvasImageRef);
        setImage(null);
    }

    useEffect(() => {
        if (selectedAi) {
            let imageUrl = image;
            if (image?.includes('?tr=')) {
                imageUrl = imageUrl + ',' + selectedAi.command
            }
            else {
                imageUrl = imageUrl + "?tr=" + selectedAi.command
            }
            console.log(imageUrl);
            setImage(imageUrl);
        }
    }, [selectedAi])





    return (
        <div>
            {!image ?
                <label htmlFor='uploadImage' className='bg-secondary p-4 flex flex-col items-center justify-center 
            rounded-xl h-[150px] mb-4'>
                    <ImageUp />
                    <h2 className='text-xs'>Upload Image</h2>
                </label> :
                <label htmlFor='uploadImage'>
                    <Image src={image} alt='Image' width={300} height={300}
                        className='w-full h-[150px] rounded-lg object-contain'
                        onLoad={() => console.log('Image Loaded')}
                    />
                </label>}
            <input type="file" id="uploadImage" className='hidden'
                onChange={onImageUpload}
            />

            {image && <Button className='w-full my-2 ' size='sm'
                onClick={onAddToCanvas}
                disabled={loading}
            >
                {loading && <Loader className='animate-spin' />}
                Add To Canvas</Button>}
        </div>
    )
}

export default CustomImageUpload