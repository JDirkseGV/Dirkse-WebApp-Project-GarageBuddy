import Link from "next/link";
import Image from "next/image"

type Properties = {
    id: string;
    year: string;
    make: string;
    model: string;
}

export default function VehicleCard({id, year, make, model}: Properties) {
    console.log("year: " + year)
  return (
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
            
                <button>Delete</button>
            </div>   
            

        </Link>
  )
}