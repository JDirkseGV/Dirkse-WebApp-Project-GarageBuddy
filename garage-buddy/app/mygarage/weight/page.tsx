'use client'

import { FormEvent, useState } from "react"
import Image from "next/image"

export default function WeightPublic() {

  const [inputs, setInputs] = useState({
    hp: 0,
    gears: 0,
    accTime: 0
  })

  const [modelPrediction, setPrediction] = useState({
    prediction: 0
  })

  const getWeight = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {

      const response = await fetch('https://immense-castle-82294.herokuapp.com/weight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      })
      const weightPrediction = await response.json()
      setPrediction({ ...modelPrediction, prediction: weightPrediction.prediction })
    }
    catch (error) {
      console.log("error : " + error)
    }

  }

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-5xl text-white mb-6">Machine Learning Curb Weight Predictor</h1>
      <Image className="rounded mb-4"
        src="/../public/carScales.png"
        alt="Car Image"
        width={470}
        height={400}
      />
      <div className="bg-zinc-800 rounded-lg p-4 m-4">
        <p className="text-white text-3xl">Predicted Weight (+/- 286lbs): {Number((modelPrediction.prediction).toFixed(2))}lbs</p>
      </div>
      <form className="mb-6 flex flex-col" onSubmit={getWeight}>
        <div className="bg-sky-500 px-8 rounded-lg mb-4">
          <label htmlFor="hp" className="block text-2xl py-2">Horsepower:</label>
          <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="hp" value={inputs.hp} onChange={(e) => setInputs({ ...inputs, hp: parseFloat(e.target.value) })} />
        </div>
        <div className="bg-sky-500 px-8 rounded-lg mb-4">
          <label htmlFor="gears" className="block text-2xl py-2">Number of Gears:</label>
          <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="gears" value={inputs.gears} onChange={(e) => setInputs({ ...inputs, gears: parseFloat(e.target.value) })} />
        </div>
        <div className="bg-sky-500 px-8 rounded-lg mb-4">
          <label htmlFor="accTime" className="block text-2xl py-2">0-62mph Time:</label>
          <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="accTime" value={inputs.accTime} onChange={(e) => setInputs({ ...inputs, accTime: parseFloat(e.target.value) })} />
        </div>

        <button className="mb-6 rounded-md text-2xl bg-sky-500 p-2 hover:bg-sky-700" type="submit">Calculate Weight</button>
      </form>
    </div>

  )
}