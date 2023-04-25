'use client'

import { FormEvent, useState } from "react"

export default function AccelerationPublic() {

    const [inputs, setInputs] = useState({
        weight: 0,
        hp: 0,
        gears: 0
    })

    const [modelPrediction, setPrediction] = useState({
        prediction: 0
    })

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
            setPrediction({...modelPrediction, prediction:accelerationPrediction.prediction})
        }
        catch (error) {
            console.log("error : " + error)
        }

    }

    return (
        <div className="flex flex-col items-center mt-6">
            <h1 className="text-5xl text-white mb-6">Acceleration Public Model Page</h1>
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
                
                <button className="mb-6 rounded-md text-2xl bg-sky-500 p-2" type="submit">Calculate Acceleration</button>
            </form>

            <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-white text-3xl">Predicted 0-62mph: {Number((modelPrediction.prediction).toFixed(2))} seconds</p>  
            </div>
            

        </div>

    )
}