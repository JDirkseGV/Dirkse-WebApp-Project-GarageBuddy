
'use client'

import AccelerationCard from "@/components/AccelerationCard";
import HorsepowerCard from "@/components/HorsepowerCard";
import WeightCard from "@/components/WeightCard";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react"
import Image from "next/image";

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
        model: "",
        weight: "",
        hp: "",
        accTime: "",
        gears: ""
    })

    useEffect(() => { 
        const loadData = async () => {
            try{
                const carDoc = doc(db, 'users', session?.user?.email!, 'cars', id)
                const result = await getDoc(carDoc).then((doc) => {
                    console.log(doc.data())
                    setCarData({...carData, year: doc?.data()?.year, make: doc?.data()?.make, model: doc?.data()?.model, weight: doc?.data()?.weight, hp: doc?.data()?.hp, accTime: doc?.data()?.accTime, gears: doc?.data()?.gears}) 
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
        }
        catch(error){
            console.log("error : " + error)
        }
    }

    const updateSpecs = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const carReference = doc(db, 'users', session?.user?.email!, 'cars', id)
            await updateDoc(carReference, {
                weight: carData.weight,
                hp: carData.hp,
                accTime: carData.accTime,
                gears: carData.gears
            })
        }
        catch (error) {
            console.log("error : " + error)
        }
    }
    

  return (
    <div className="flex flex-col">
        <div className="flex">
            <div className="flex flex-col items-center p-4">
                <Image className="rounded"
                    src="/static/img/audi.jpg"
                    alt="Car Image"
                    width={500}
                    height={500}
                />
                <div className="flex flex-col text-3xl">
                    <p>{carData.year} {carData.make} {carData.model}</p>
                </div>
                <div className="flex flex-col">
                    <p>{carData.weight} lbs, {carData.hp} hp, {carData.accTime}sec 0-60, {carData.gears} speeds</p>
                </div>
            </div>
        
        
            <div className="border-zinc-400 border-2 rounded ml-32 mt-4 bg-zinc-500 ">
                <form onSubmit={updateCars} className="flex flex-col p-4">
                    <label htmlFor="year" className="block text-2xl">Year:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="number" id="year" value={carData.year} onChange={(e) => setCarData({...carData, year: e.target.value})}/>
                    <label htmlFor="make" className="block text-2xl">Make:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="text" id="make" value={carData.make} onChange={(e) => setCarData({ ...carData, make: e.target.value })} />
                    <label htmlFor="model" className="block text-2xl">Model:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="text" id="model" value={carData.model} onChange={(e) => setCarData({ ...carData, model: e.target.value })} />
                    <button type="submit" className="rounded-md text-2xl bg-sky-500 p-2 hover:bg-sky-700 mt-24">Update Car Info</button>
                </form> 
            </div>
            <div className="border-zinc-400 border-2 rounded ml-32 mt-4 bg-zinc-500">
                <form onSubmit={updateSpecs} className="flex flex-col p-4">
                    <label htmlFor="weight" className="block text-2xl">Weight:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="number" step="any" id="weight" value={carData.weight} onChange={(e) => setCarData({ ...carData, weight: e.target.value })} />
                    <label htmlFor="hp" className="block text-2xl">Horsepower:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="number" step="any" id="hp" value={carData.hp} onChange={(e) => setCarData({ ...carData, hp: e.target.value })} />
                    <label htmlFor="accTime" className="block text-2xl">0-62mph Time:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="number" step="any" id="accTime" value={carData.accTime} onChange={(e) => setCarData({ ...carData, accTime: e.target.value })} />
                    <label htmlFor="gears" className="block text-2xl">Number of Gears:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="number" step="any" id="gears" value={carData.gears} onChange={(e) => setCarData({ ...carData, gears: e.target.value })} />
                    <button type="submit" className="rounded-md text-2xl bg-sky-500 p-2 hover:bg-sky-700">Update Specs</button>
                </form>
            </div>
        
        </div>
        
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