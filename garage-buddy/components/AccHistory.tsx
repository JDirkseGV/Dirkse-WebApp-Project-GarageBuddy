import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { TrashIcon } from '@heroicons/react/24/solid'

type Properties = {
    id: string;
    carId: string;
    weight: number;
    hp: number;
    gears: number;
    prediction: number;
}

export default function AccHistory({id, carId, weight, hp, gears, prediction }: Properties) {

    const { data: session } = useSession()

    const deleteCard = async () => {
        const res = await deleteDoc(doc(db, 'users', session?.user?.email!, 'cars', carId, 'acceleration predictions', id))
    }

    return (
        <div className="flex border-zinc-800 w-64 justify-between border rounded m-1 bg-zinc-400 border-4">
            <div className="flex flex-col p-1">
                <p>Weight: {weight}lbs</p>
                <p>HP: {hp}</p>
                <p>Gears: {gears}</p>
                <p>Prediction: {prediction} seconds</p>
            </div>
            <div onClick={deleteCard} className="flex border-2 h-6 w-6 border-black items-center bg-red-600 rounded justify- m-2 hover:border-white hover:cursor-pointer">
                <TrashIcon className="h-6 w-6"></TrashIcon>
            </div>
        </div>
    )
}