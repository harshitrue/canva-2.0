import React, { useEffect, useState } from 'react'
import ShapesSettings from '../Sharable/ShapesSettings'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { TextSettingsList } from '../Options';
import TextSettingsNavbar from './TextSettingsNavbar';

function TopNavBar() {
    const { canvasEditor } = useCanvasHook();
    const [showShapeSettings, setShowShapeSettings] = useState(false);
    const [enableTextSettings, setEnableTextSettings] = useState(false);
    useEffect(() => {
        if (canvasEditor) {
            const activeObject = canvasEditor.getActiveObject();
            console.log(activeObject, canvasEditor);
        }
    }, [canvasEditor])

    if (canvasEditor) {
        canvasEditor.on('selection:created', function (e) {
            console.log('Selected Element', e);
            const activeObject = canvasEditor.getActiveObject();
            console.log(activeObject);
            if (!activeObject.text) {
                setEnableTextSettings(false);
                setShowShapeSettings(true);

            }
            if (activeObject.text) {
                setShowShapeSettings(false);
                setEnableTextSettings(true);
            }
        })

        canvasEditor.on('selection:updated', function () {
            const activeObject = canvasEditor.getActiveObject();

            if (!activeObject.text) {
                setEnableTextSettings(false);
                setShowShapeSettings(true);

            }
            if (activeObject.text) {
                setShowShapeSettings(false);
                setEnableTextSettings(true);
            }
        })

        canvasEditor.on('selection:cleared', function () {
            setShowShapeSettings(false);
            setEnableTextSettings(false);
        })
    }

    return (
        <div className='p-3 bg-white'>
            {showShapeSettings && <ShapesSettings />}
            {enableTextSettings && <TextSettingsNavbar />}
        </div>
    )
}

export default TopNavBar