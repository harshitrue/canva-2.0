import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Image from 'next/image';
import React from 'react'

function TemplatesList() {

    const { canvasEditor } = useCanvasHook();
    const templateList = useQuery(api.templates.GetAllTemplatest);

    const onTemplateSelect = (template) => {
        if (canvasEditor) {
            canvasEditor.loadFromJSON(template?.jsonData, () => {
                canvasEditor?.requestRenderAll();
            })
        }
    }

    return (
        <div>
            <div className='grid grid-cols-2 gap-5'>
                {templateList?.map((template, index) => (
                    <Image src={template.imagePreview}
                        onClick={() => onTemplateSelect(template)}
                        key={index}
                        alt={template?.name}
                        width={500}
                        height={500}
                        className='w-full h-[150px] rounded-lg
                         object-contain bg-secondary cursor-pointer'
                    />
                ))}
            </div>
        </div>
    )
}

export default TemplatesList