import Image from 'next/image'
import React from 'react'
import PreTemplatesList from '../_components/PreTemplatesList'

function Templates() {
    return (
        <div className='p-10 w-full'>
            <div className='relative'>
                <Image src={'/banner-home.png'} alt='banner' width={1800} height={300}
                    className='w-full h-[200px] rounded-2xl object-cover'
                />
                <h2 className='text-3xl absolute bottom-5 left-10 text-white'>Projects</h2>
            </div>
            <PreTemplatesList />
        </div>
    )
}

export default Templates