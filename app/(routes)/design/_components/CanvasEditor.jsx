import { Canvas } from 'fabric';
import React, { useEffect, useRef, useState } from 'react'
import { useCanvasHook } from '../[designId]/page';
import TopNavBar from '@/services/Components/TopNavBar';

function CanvasEditor({ DesignInfo }) {
    const canvasRef = useRef();

    const { canvasEditor, setCanvasEditor } = useCanvasHook();
    /**
     * Used to Init the Canvas with default width and height
     */
    useEffect(() => {
        if (canvasRef.current && DesignInfo) {

            const initCanvas = new Canvas(canvasRef.current, {
                width: DesignInfo?.width,
                height: DesignInfo?.height,
                backgroundColor: '#fff',
                preserveObjectStacking: true,
                controlsAboveOverlay: true
            })

            // initCanvas.sendObjectBackwards
            //set High Resolution Canvas
            // const scaleFactor = window.devicePixelRatio || 1;

            // initCanvas.set({
            //     width: DesignInfo?.width * scaleFactor,
            //     height: DesignInfo?.height * scaleFactor,
            //     zoom: 1 / scaleFactor
            // })

            if (DesignInfo?.jsonTemplate) {
                initCanvas.loadFromJSON(DesignInfo?.jsonTemplate, () => {
                    initCanvas?.requestRenderAll();
                })
            }

            initCanvas.renderAll();

            setCanvasEditor(initCanvas);


            return () => {
                initCanvas.dispose();
            }
        }
    }, [DesignInfo])

    /**
     * Used to Delete the selected Element/Object
     */
    useEffect(() => {
        const handleKeyDown = (event) => {
            // if (event.key == 'Delete' || event?.key !== 'Backspace') {
            //     if (canvasEditor) {
            //         const activeObject = canvasEditor.getActiveObject();
            //         if (activeObject) {
            //             canvasEditor.remove(activeObject);
            //             canvasEditor.renderAll()
            //         }
            //     }
            // }
        }
        console.log(canvasEditor)
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [canvasEditor])


    // useEffect(() => {
    //     if (canvasEditor && DesignInfo) {
    //         if (DesignInfo?.jsonTemplate) {
    //             console.log(JSON.stringify(DesignInfo?.jsonTemplate))
    //             canvasEditor.loadFromJSON(DesignInfo?.jsonTemplate, () => {
    //                 canvasEditor.requestRenderAll();
    //             })
    //         }
    //     }
    // }, [canvasEditor])

    return (
        <div className='bg-secondary w-full h-screen '>
            <TopNavBar />

            <div className=' flex mt-10 items-center justify-center
        flex-col relative'>

                <canvas id='canvas' ref={canvasRef} />
            </div>
        </div>
    )
}

export default CanvasEditor