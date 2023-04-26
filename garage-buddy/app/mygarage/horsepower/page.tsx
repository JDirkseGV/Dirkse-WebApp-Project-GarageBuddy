'use client'

import { FormEvent, useState } from "react"
import Image from "next/image"

export default function HorsepowerPublic() {

    const [inputs, setInputs] = useState({
        weight: 0,
        gears: 0,
        accTime: 0
    })

    const [modelPrediction, setPrediction] = useState({
        prediction: 0
    })

    const getHorsepower = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            const response = await fetch('https://immense-castle-82294.herokuapp.com/hp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
            const hpPrediction = await response.json()
            setPrediction({ ...modelPrediction, prediction: hpPrediction.prediction })
        }
        catch (error) {
            console.log("error : " + error)
        }

    }

    return (
        <div className="flex flex-col items-center mt-6">
            <h1 className="text-5xl text-white mb-6">Machine Learning Horsepower Predictor</h1>
            <Image className="rounded mb-4"
                src="/../public/dynoGraph.jpg"
                alt="Car Image"
                width={400}
                height={400}
            />
            <div className="bg-zinc-800 rounded-lg p-4 m-4">
                <p className="text-white text-3xl">Predicted Horsepower (+/- 22hp): {Number((modelPrediction.prediction).toFixed(2))}bhp</p>
            </div>
            <form className="mb-6 flex flex-col" onSubmit={getHorsepower}>
                <div className="bg-sky-500 px-8 rounded-lg mb-4">
                    <label htmlFor="weight" className="block text-2xl py-2">Curb Weight(lbs):</label>
                    <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="weight" value={inputs.weight} onChange={(e) => setInputs({ ...inputs, weight: parseFloat(e.target.value) })} />
                </div>
                <div className="bg-sky-500 px-8 rounded-lg mb-4">
                    <label htmlFor="gears" className="block text-2xl py-2">Number of Gears:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="gears" value={inputs.gears} onChange={(e) => setInputs({ ...inputs, gears: parseFloat(e.target.value) })} />
                </div>
                <div className="bg-sky-500 px-8 rounded-lg mb-4">
                    <label htmlFor="accTime" className="block text-2xl py-2">0-62mph Time:</label>
                    <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="accTime" value={inputs.accTime} onChange={(e) => setInputs({ ...inputs, accTime: parseFloat(e.target.value) })} />
                </div>

                <button className="mb-6 rounded-md text-2xl bg-sky-500 p-2 hover:bg-sky-700" type="submit">Calculate Horsepower</button>
            </form>
        </div>

    )
}