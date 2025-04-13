import React from 'react'
import { StickerList } from '../Options'
import Image from 'next/image'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { FabricImage } from 'fabric';

function Stcikers() {

    const { canvasEditor } = useCanvasHook();

    const onAddSticker = async (imageUrl) => {
        if (canvasEditor) {
            const canvasImageRef = await FabricImage.fromURL(
                imageUrl,
                {
                    crossOrigin: 'anonymous'
                }
            )

            canvasEditor.add(canvasImageRef);
        }
    }

    return (
        <div className='mt-5'>
            <h2 className='text-md font-bold'>Stcikers</h2>
            <div className='grid grid-cols-3 gap-7 h-[50vh] overflow-auto'>
                {StickerList.map((sticker, index) => (
                    <Image src={sticker} alt={sticker} onClick={() => onAddSticker(sticker)} key={index} width={100}
                        height={100} className='w-full h-[70px] object-contain cursor-pointer' />
                ))}
            </div>
        </div>
    )
}

export default Stcikers