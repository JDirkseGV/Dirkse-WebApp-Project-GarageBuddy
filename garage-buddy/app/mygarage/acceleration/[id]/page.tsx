'use client'

import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Properties = {
  params: {
    id: string;
  }
}

export default function Acceleration({ params: { id } }: Properties) {
  const { data: session } = useSession();
  const [carData, setCarData] = useState({
    year: "",
    make: "",
    model: ""
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const carDoc = doc(db, 'users', session?.user?.email!, 'cars', id)
        const result = await getDoc(carDoc).then((doc) => {
          console.log(doc.data())
          setCarData({ ...carData, year: doc?.data()?.year, make: doc?.data()?.make, model: doc?.data()?.model })
        })
      }
      catch {
        console.log("doc fetch error")
      }
    }
    console.log("loading client side data...")
    loadData()

  }, []); 



  return (
    <div>
      <p>Acceleration Model Page</p>
      <p>{carData.year}</p>
      <p>{carData.make}</p>
      <p>{carData.model}</p>



    </div>

  )
}

