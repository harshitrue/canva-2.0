import React, { useState } from 'react'
import ColorPickerEditor from '../Sharable/ColorPickerEditor'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'

function BackrgoundSetting() {
    const [bgColor, setBgColor] = useState('#fff')
    const { canvasEditor } = useCanvasHook();

    /**
     * Use to change the cavas color
     * @param {*} color 
     */
    const onColorChange = (color) => {
        setBgColor(color);
        canvasEditor?.set({
            backgroundColor: color,
            backgroundImage: null
        })
        canvasEditor.renderAll();

    }
    return (
        <div>
            <ColorPickerEditor
                value={bgColor}
                onColorChange={(v) => onColorChange(v)} />
        </div>
    )
}

export default BackrgoundSetting