"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from 'convex/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function PreTemplatesList() {

    const templateList = useQuery(api.templates.GetAllTemplatest);
    const createNewDesignFromTemplate = useMutation(api.designs.CreateDesignFromTemplate)
    const { userDetail } = useContext(UserDetailContext);
    const router = useRouter();

    const onTemplateSelect = async (template) => {
        // Save to Design Table with Uid
        const id = await createNewDesignFromTemplate({
            imagePreview: template?.imagePreview,
            jsonTemplate: template?.jsonData,
            name: template?.name,
            uid: userDetail?._id,
            width: template?.width,
            height: template?.height

        })

        console.log(id);
        router.push('/design/' + id);

    }
    return (
        <div>
            <div className='grid grid-cols-2 md:grid-cols-3 
                lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>

                {templateList?.map((design, index) => (
                    <div key={index} className='bg-secondary rounded-lg'
                        onClick={() => onTemplateSelect(design)}
                    >
                        <Image src={design?.imagePreview}
                            alt={design?.name}
                            width={300}
                            height={300}
                            className='w-full cursor-pointer h-[200px] object-contain rounded-lg'
                        />

                    </div>
                ))}
            </div>
        </div>
    )
}

export default PreTemplatesList