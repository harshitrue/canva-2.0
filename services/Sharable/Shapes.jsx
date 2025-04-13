import React from 'react'
import { ShapeList } from '../Options'
import Image from 'next/image'
import { Circle, Line, Rect } from 'fabric'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import Stcikers from './Stcikers'

function Shapes() {

    const { canvasEditor } = useCanvasHook();
    const onShapeSelect = (shape) => {
        const properties = {
            left: 100,
            top: 100,
            radius: 50,
            fill: 'black',
            stroke: 'black',
            width: 100,
            height: 100,

        }
        if (shape.name == 'Circle') {
            const circleRef = new Circle({
                ...properties
            })
            canvasEditor.add(circleRef)
        } else if (shape.name == 'Square') {
            const squareRef = new Rect({
                ...properties,

            })
            canvasEditor.add(squareRef)
        }
        else if (shape.name == 'Line') {
            const squareRef = new Line([50, 50, 200, 200], {
                stroke: 'black',
                strokeWidth: 5
            })
            canvasEditor.add(squareRef)
        }
        canvasEditor.renderAll()
    }

    return (
        <div>
            <div className='grid grid-cols-3 gap-3'>
                {ShapeList.map((shape, index) => (
                    <div className='p-2 border rounded-xl' key={index} onClick={() => onShapeSelect(shape)}>
                        <Image src={shape.icon} alt={shape.name}
                            width={100}
                            height={100}
                        />
                    </div>
                ))}
            </div>
            <Stcikers />
        </div>
    )
}

export default Shapes