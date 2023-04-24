
'use client'

import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react"
import { useCollection } from "react-firebase-hooks/firestore";

type Properties = {
    params:{
        id: string;
    }

}



export default function Car({params: {id}}: Properties) {
    console.log("id: "+ id)
    const { data: session } = useSession();
    const [carData, setCarData] = useState({
        year: "",
        make: "",
        model: ""
    })
    const [isLoading, setLoading] = useState(false)


    useEffect(() => { 
        const loadData = async () => {
            setLoading(true)
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
            setLoading(false)   
        }
        console.log("loading client side data...")
        loadData()
        
    }, []); 
    
    


    const router = useRouter()

    const updateCars = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const carReference = doc(db, "users/cars", id)
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