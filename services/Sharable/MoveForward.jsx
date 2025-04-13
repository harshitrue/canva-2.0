import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import React from 'react'

function MoveForward() {
    const { canvasEditor } = useCanvasHook();

    const MoveForward = () => {
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            canvasEditor.bringObjectForward(activeObject);

        }
    }

    return (
        <div onClick={MoveForward} className='cursor-pointer'>Move Forward</div>
    )
}

export default MoveForward