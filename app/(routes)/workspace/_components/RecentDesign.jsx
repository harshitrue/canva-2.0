"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import CustomCanvasDialog from './CustomCanvasDialog';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'next/navigation';

function RecentDesign() {
    const [designList, setDesignList] = useState([]);
    const { userDetail } = useContext(UserDetailContext);
    const convex = useConvex();
    const router = useRouter();

    useEffect(() => {
        userDetail && GetRecentDesigns();
    }, [userDetail])

    const GetRecentDesigns = async () => {
        const result = await convex.query(api.designs.GetUserDesigns, {
            uid: userDetail?._id
        });
        console.log(result);
        setDesignList(result);
    }

    return (
        <div className='mt-7'>
            <h2 className='font-bold text-2xl'>Recent Designs</h2>

            {designList?.length == 0 ?
                <div className='flex flex-col gap-4 items-center mt-5'>
                    <Image src={'/edittool.png'} alt='edit' width={100} height={100} />
                    <h2 className="text-center">You don't have any design created, Create New one!</h2>
                    <CustomCanvasDialog>
                        <Button>+ Create New</Button>
                    </CustomCanvasDialog>

                </div> :
                <div className='grid grid-cols-2 md:grid-cols-3 
                lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>

                    {designList?.map((design, index) => (
                        <div key={index} className='bg-secondary rounded-lg'
                            onClick={() => router.push('/design/' + design?._id)}
                        >
                            {design?.imagePreview ? <Image src={design?.imagePreview}
                                alt={design?.name}
                                width={300}
                                height={300}
                                className='w-full cursor-pointer h-[200px] object-contain rounded-lg'
                            /> : null}

                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default RecentDesign