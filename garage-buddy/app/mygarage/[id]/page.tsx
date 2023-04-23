
'use client'

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, {useState} from "react"



export default function Car() {
    console.log("id: "+ [id])

    const [carData, setCarData] = useState({
        year: year,
        make: make,
        model: model
    })

    const router = useRouter()

    const updateCars = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const carReference = doc(db, "cars", id)
            await updateDoc(carReference, {
                year: carData.year,
                make: carData.make,
                model: carData.model
            })
            router.push('/mygarage')
        }
        catch(error){
            console.log("error : " + error)
        }

    }
    

  return (
    <div>
        <form onSubmit={updateCars}>
            <label htmlFor="year">Year:</label>
            <input type="number" id="year" value={carData.year} onChange={(e) => setCarData({...carData, year: e.target.value})}/>
            <label htmlFor="make">Make:</label>
            <input type="text" id="make" value={carData.make} onChange={(e) => setCarData({ ...carData, make: e.target.value })} />
            <label htmlFor="model">Model:</label>
            <input type="text" id="model" value={carData.model} onChange={(e) => setCarData({ ...carData, model: e.target.value })} />
            <button type="submit">Update Car Info</button>
        </form>

    </div>
  )
}