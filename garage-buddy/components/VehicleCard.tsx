import Link from "next/link";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { db } from "@/firebase";
import { collection, doc, getDoc, query } from "firebase/firestore";
import { useSession } from "next-auth/react";

type Properties = {
    id: string;
    year: string;
    make: string;
    model: string;
}

export default function VehicleCard({id, year, make, model}: Properties) {

    const {data:session} = useSession()
    console.log("id " + id)
    console.log("userid " + make)


    

  return (
    <>
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
            
                <button className="border rounded">Delete</button>
            </div>   
        </Link>
    </>
        
  )
}