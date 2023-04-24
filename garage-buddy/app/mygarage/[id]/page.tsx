
'use client'

import AccelerationCard from "@/components/AccelerationCard";
import HorsepowerCard from "@/components/HorsepowerCard";
import WeightCard from "@/components/WeightCard";
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react"
import { useCollection } from "react-firebase-hooks/firestore";

type Properties = {
    params:{
        id: string;
    }
}

export default function Car({params: {id}}: Properties) {
    const { data: session } = useSession();
    const [carData, setCarData] = useState({
        year: "",
        make: "",
        model: ""
    })

    useEffect(() => { 
        const loadData = async () => {
            try{
                const carDoc = doc(db, 'users', session?.user?.email!, 'cars', id)
                const result = await getDoc(carDoc).then((doc) => {
                    console.log(doc.data())
                    setCarData({...carData, year: doc?.data()?.year, make: doc?.data()?.make, model: doc?.data()?.model}) 
                })
            }
            catch{
                console.log("doc fetch error")
            }  
        }
        console.log("loading client side data...")
        loadData()
        
    }, []); 
    
    const router = useRouter()

    const updateCars = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const carReference = doc(db, 'users', session?.user?.email!, 'cars', id)
            await updateDoc(carReference, {
                year: carData.year,
                make: carData.make,
                model: carData.model
            })
            router.push('/mygarage') //TODO: is this push needed?
        }
        catch(error){
            console.log("error : " + error)
        }

    }
    

  return (
    <div className="flex flex-col">
          <p>{carData.year}</p>
          <p>{carData.make}</p>
          <p>{carData.model}</p>
        <form onSubmit={updateCars}>
            <label htmlFor="year">Year:</label>
            <input type="number" id="year" value={carData.year} onChange={(e) => setCarData({...carData, year: e.target.value})}/>
            <label htmlFor="make">Make:</label>
            <input type="text" id="make" value={carData.make} onChange={(e) => setCarData({ ...carData, make: e.target.value })} />
            <label htmlFor="model">Model:</label>
            <input type="text" id="model" value={carData.model} onChange={(e) => setCarData({ ...carData, model: e.target.value })} />
            <button type="submit">Update Car Info</button>
        </form>
        <div className="flex flex-row flex-wrap p-4">
            <AccelerationCard path={`acceleration/${id}`}></AccelerationCard>
            <HorsepowerCard path={`horsepower/${id}`}></HorsepowerCard>
            <WeightCard path={`weight/${id}`}></WeightCard>

            {/* <Link className="m-4" href={`/mygarage/acceleration/${id}`} >Acceleration Prediction</Link>
            <Link className="m-4" href={`/mygarage/weight/${id}`} >Weight Prediction</Link>
            <Link className="m-4" href={`/mygarage/horsepower/${id}`} >Horsepower Prediction</Link> */}
        </div>


    </div>
  )
}