import Link from "next/link";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, doc, getDoc, query, deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

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
    <div className="flex flex-col">
        <Link className="m-4" href={`/mygarage/${id}`} >
        <Image className="rounded"
            src="/../public/audi.jpg"
            alt="Car Image"
            width={200}
            height={200}
            />
            <div className="flex flex-col justify-between">
                <p>{year}</p>
                <p>{make}</p>
                <p>{model}</p>
            </div>   
        </Link>
        <button className="border rounded mx-16 inset-" onClick={deleteCar}>Delete</button>
    </div>
        

        
  )
}