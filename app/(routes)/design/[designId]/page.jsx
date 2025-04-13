"use client"
import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import DesignHeader from '../_components/DesignHeader';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import SideBar from '../_components/SideBar';
import CanvasEditor from '../_components/CanvasEditor';
import { CanvasContext } from '@/context/CanvasContext';

function DesignEditor() {
    const { designId } = useParams();
    const [canvasEditor, setCanvasEditor] = useState();
    const DesignInfo = useQuery(api.designs.GetDesign, {
        id: designId
    });

    return (
        <div>
            <CanvasContext.Provider value={{ canvasEditor, setCanvasEditor }}>
                <DesignHeader DesignInfo={DesignInfo} />
                <div className='flex'>
                    <SideBar />
                    <CanvasEditor DesignInfo={DesignInfo} />
                </div>
            </CanvasContext.Provider>
        </div>
    )
}

export default DesignEditor

export const useCanvasHook = () => {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error("Error")
    }
    return context
}