'use client'

import LeftBar from "@/components/LeftBar"
import NewCar from "@/components/NewCar"
import VehicleCard from "@/components/VehicleCard"
import { db } from "@/firebase";
import {useCollection} from "react-firebase-hooks/firestore"
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { spawn } from "child_process";

export default function GaragePage() {

    //const serverSession = await getServerSession(authOptions)

    const {data:session} = useSession();
    const router = useRouter()



    const [cars, loadingCollection, error] = useCollection(
        session && collection(db,"users", session.user?.email!, "cars")
    )

    return (
        <div className="flex">
            <LeftBar />
            <div className="flex-1">
                <NewCar />
                <p className="text-white px-4 text-5xl">Your Vehicles: </p> 
                <div className="flex flex-row flex-wrap m-4">
                    {loadingCollection && <span className="text-lg text-white">Collection: Loading...</span>}
                    {cars && cars?.docs?.map(car =>(
                        <VehicleCard key={car.id} id={car.id} year={car.data().year} make={car.data().make} model={car.data().model} />
                    ))}   
                </div>  
                
            </div>
            
        </div>
    )   
    
}
