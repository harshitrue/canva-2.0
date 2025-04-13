import React from 'react'
import { FontFamilyList } from '../Options'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

function FontFamily() {

    const { canvasEditor } = useCanvasHook();

    const onFontFamilyChange = (value) => {
        console.log(value)
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            activeObject.set({
                fontFamily: value
            });

            canvasEditor.renderAll();
        }
    }

    return (
        <div className='h-[200px] overflow-auto'>
            {FontFamilyList.map((font, index) => (
                <h2 key={index} className='text-lg p-2 bg-secondary rounded-lg mb-2'
                    style={{
                        fontFamily: font
                    }}
                    onClick={() => onFontFamilyChange(font)}
                >{font}</h2>
            ))}
        </div>
    )
}

export default FontFamily