import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import React from 'react'

function MoveBackword() {
    const { canvasEditor } = useCanvasHook();

    const MoveBackword = () => {
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            canvasEditor.sendObjectBackwards(activeObject);

        }
    }
    return (
        <div onClick={MoveBackword} className='cursor-pointer'>Move Backword</div>
    )
}

export default MoveBackword