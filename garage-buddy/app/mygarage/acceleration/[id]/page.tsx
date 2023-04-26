'use client'

import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

type Properties = {
  params: {
    id: string;
  }
}

export default function Acceleration({ params: { id } }: Properties) {
  console.log("id", id)
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
  const [inputs, setInputs] = useState({
    weight: 0,
    hp: 0,
    gears: 0
  })
  const [modelPrediction, setPrediction] = useState({
    prediction: 0
  })

  const loadData = async () => {
    try {
      if (session) {
        const carDoc = doc(db, 'users', session?.user?.email!, 'cars', id)
        const result = await getDoc(carDoc).then((doc) => {
          setCarData({ ...carData, year: doc?.data()?.year, make: doc?.data()?.make, model: doc?.data()?.model, weight: doc?.data()?.weight, hp: doc?.data()?.hp, accTime: doc?.data()?.accTime, gears: doc?.data()?.gears })
        })
      }
    }
    catch {
      console.log("doc fetch error")
    }
  }

  useEffect(() => { 
        console.log("loading client side data...")
        loadData()
    }, []);

  const getAcceleration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {

      const response = await fetch('http://localhost:8000/acceleration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })
      const accelerationPrediction = await response.json()
      setPrediction({ ...modelPrediction, prediction: accelerationPrediction.prediction })
    }
    catch (error) {
      console.log("error : " + error)
    }

  }



  return (
    <div className="flex flex-row justify-between">
      <div>
        <div className="flex flex-col items-center p-4">
          <Image className="rounded"
            src="/../public/audi.jpg"
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
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-white mb-6">Machine Learning Acceleration Predictor</h1>
        <div className="bg-zinc-800 rounded-lg p-4">
          <p className="text-white text-3xl">0-62mph: {Number((modelPrediction.prediction).toFixed(2))} seconds</p>
        </div>
        <h1 className="text-2xl text-white mb-6">(current accuracy is +/- 0.8 seconds)</h1>
        <form className="mb-6 flex flex-col" onSubmit={getAcceleration}>
          <div className="bg-sky-500 px-8 rounded-lg mb-4">
            <label htmlFor="weight" className="block text-2xl py-2">Curb Weight(lbs):</label>
            <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="weight" value={inputs.weight} onChange={(e) => setInputs({ ...inputs, weight: parseFloat(e.target.value) })} />
          </div>
          <div className="bg-sky-500 px-8 rounded-lg mb-4">
            <label htmlFor="horsepower" className="block text-2xl py-2">Horsepower:</label>
            <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="horsepower" value={inputs.hp} onChange={(e) => setInputs({ ...inputs, hp: parseFloat(e.target.value) })} />
          </div>
          <div className="bg-sky-500 px-8 rounded-lg mb-4">
            <label htmlFor="gears" className="block text-2xl py-2">Number of Gears:</label>
            <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="gears" value={inputs.gears} onChange={(e) => setInputs({ ...inputs, gears: parseFloat(e.target.value) })} />
          </div>
          <button className="mb-6 rounded-md text-2xl bg-sky-500 p-2 hover:bg-sky-700" type="submit">Calculate Acceleration</button>
        </form>
      </div>
      
      <p>Acceleration Model Page</p>
      <p>{carData.year}</p>
      <p>{carData.make}</p>
      <p>{carData.model}</p>


      <div>

      </div>


    </div>

  )
}

