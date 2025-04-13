import React, { useState } from 'react'
import { TextSettingsList } from '../Options'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Trash } from 'lucide-react'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import FontStyles from '../Sharable/FontStyles';
function TextSettingsNavbar() {
    const { canvasEditor } = useCanvasHook();
    const [show, setShow] = useState(false);
    const onDelete = () => {
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            canvasEditor.remove(activeObject);
            setShow(true);
        }
    }
    return (
        <div className='flex gap-6 items-center'>
            {TextSettingsList.map((shape, index) => (
                <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <shape.icon />
                        </PopoverTrigger>
                        <PopoverContent>
                            {shape.component}
                        </PopoverContent>
                    </Popover>

                </div>
            ))}

            <FontStyles />

            <Trash onClick={onDelete} className='hover:scale-105 transition-all cursor-pointer' />
        </div>
    )
}

export default TextSettingsNavbar