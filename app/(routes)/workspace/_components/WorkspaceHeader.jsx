import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
    return (
        <div className='p-2 px-5 flex justify-between items-center shadow-sm'>
            <Image src={'/logo.png'} alt='logo' width={100} height={100}
                className='w-[100px] h-[50px]'
            />
            <UserButton />
        </div>
    )
}

export default WorkspaceHeader