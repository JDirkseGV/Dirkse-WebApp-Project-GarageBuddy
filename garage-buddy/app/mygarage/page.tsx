'use client'

import LeftBar from "@/components/LeftBar"
import NewCar from "@/components/NewCar"
import VehicleCard from "@/components/VehicleCard"
import { db } from "@/firebase";
import {useCollection} from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";

export default function GaragePage() {

    const {data:session} = useSession();
    const [cars, loading, error] = useCollection(
        session && collection(db,"users", session.user?.email!, "cars")
    )
    console.log(cars)

    return (
        <div className="flex">
            <LeftBar />
            <div className="flex-1">
                <NewCar />
                <p className="text-white px-4 text-5xl">Your Vehicles: </p> 
                <div className="flex flex-row m-4">
                    {cars?.docs?.map(car =>(
                        <VehicleCard key={car.id} id={car.id} year={car.data().year} make={car.data().make} model={car.data().model} />
                    ))}   
                </div>  
                
            </div>
            
        </div>
    )
}