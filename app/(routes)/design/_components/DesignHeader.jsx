import { Button } from '@/components/ui/button'
import { UserButton } from '@stackframe/stack'
import { Download, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useCanvasHook } from '../[designId]/page'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import ImageKit from 'imagekit'
import Link from 'next/link'

function DesignHeader({ DesignInfo }) {

    const { canvasEditor } = useCanvasHook();
    const SaveDesign = useMutation(api.designs.SaveDesign);
    const { designId } = useParams();

    var imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });
    /**
     * Used to Save Design in JSON format in Database
     */
    const onSave = async () => {
        toast('Saving...!')
        if (canvasEditor) {

            const base64Image = canvasEditor?.toDataURL({
                format: 'png',
                quality: 0.5
            });

            //Get List of Files
            const existingFiles = await imagekit.listFiles({
                searchQuery: `name="${designId}.png"`
            });

            //Delete Old File of Exist
            if (existingFiles[0]?.fileId) {
                await imagekit.deleteFile(existingFiles[0]?.fileId);
            }


            const imageRef = await imagekit.upload({
                file: base64Image,
                fileName: designId + ".png",
                isPublished: true,
                useUniqueFileName: false,
            });
            console.log(imageRef.url);

            const JsonDesign = canvasEditor.toJSON();

            const result = await SaveDesign({
                id: designId,
                jsonDesign: JsonDesign,
                imagePreview: imageRef.url // ImageKit Image url
            });
            console.log(result);

            toast('Saved!')
        }


    }

    const onExport = () => {
        //Base64 Image
        const dataUrl = canvasEditor?.toDataURL({
            format: 'png',
            quality: 1
        });

        const link = document?.createElement("a");
        link.href = dataUrl;
        link.download = 'CanvaCloneDesign.png',
            link.click();
    }


    return (
        <div className='p-3 flex justify-between
        bg-gradient-to-r from-sky-500 via-blue-400 to-purple-600
        '>
            <Link href={'/workspace'}>
                <Image src={'/logo-white.png'} alt='logo' width={100} height={60} />
            </Link>
            <input placeholder='Design Name' className='text-white border-none outline-none'
                defaultValue={DesignInfo?.name}

            />
            <div className='flex gap-5'>
                <Button onClick={onSave}> <Save /> Save</Button>
                <Button onClick={() => onExport()}> <Download /> Export</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default DesignHeader