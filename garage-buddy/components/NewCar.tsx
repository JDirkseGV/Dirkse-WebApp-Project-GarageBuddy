'use client'

import { PlusIcon } from '@heroicons/react/24/solid'


export default function NewCar() {
    return (
        <div className="flex justify-center p-4 m-4 bg-sky-500 rounded-md hover:bg-sky-700 cursor-pointer">
            <p className='mx-2'>Add Vehicle</p>
            <PlusIcon className='h-6 w-6 p-'/>
        </div>
    )
}