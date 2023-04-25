import Link from "next/link";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, doc, getDoc, query, deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { TrashIcon } from '@heroicons/react/24/solid'

type Properties = {
    id: string;
    year: string;
    make: string;
    model: string;
}

export default function VehicleCard({id, year, make, model}: Properties) {

    const {data:session} = useSession()

    const deleteCar = async () => {
        const res = await deleteDoc(doc(db, 'users', session?.user?.email!, 'cars', id))
    }

  return (
      <div className="flex border-zinc-800 flex-col justify-between border rounded mx-2 bg-zinc-400 border-4 hover:border-zinc-300 hover:cursor-pointer">
        <Link className="m-4" href={`/mygarage/${id}`} >
        <Image className="rounded"
            src="/../public/audi.jpg"
            alt="Car Image"
            width={200}
            height={200}
            />
            <div className="flex flex-col justify-between items-left text-lg">
                <p>Year: {year}</p>
                <p>Make: {make}</p>
                <p>Model: {model}</p>
            </div>   
        </Link>
          <div onClick={deleteCar} className="flex border-2 border-black items-center bg-red-600 rounded w-28 h-8 justify-center m-2 hover:border-white">
            <TrashIcon className="h-6 w-6"></TrashIcon> 
            <p>delete car</p>
        </div>
        
    </div>
        

        
  )
}