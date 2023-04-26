'use client'

import { db } from '@/firebase'
import { PlusIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'


export default function NewCar() {
    const router = useRouter()
    const {data:session} = useSession()

    const createNewCar = async() => {
        const doc = await addDoc(collection(db, 'users', session?.user?.email!, 'cars'), {
            userId: session?.user?.email!,
            timestamp: serverTimestamp(),
            year: "",
            make: "",
            model: "",
            weight: "",
            hp: "",
            accTime: "",
            gears: ""
        });
        //router.push(`/mygarage/${doc.id}`)
    }

    return (
        <div onClick={createNewCar} className="flex justify-center p-4 m-4 bg-sky-500 rounded-md hover:bg-sky-700 cursor-pointer">
            <p className='mx-2'>Add Vehicle</p>
            <PlusIcon className='h-6 w-6'/>
        </div>
    )
}