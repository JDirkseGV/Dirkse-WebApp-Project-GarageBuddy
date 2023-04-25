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
            setPrediction({...modelPrediction, prediction:accelerationPrediction})
        }
        catch (error) {
            console.log("error : " + error)
        }

    }

    return (
        <div>
            <p>Acceleration Public Model Page</p>
            <form onSubmit={getAcceleration}>
                <label htmlFor="weight">Weight:</label>
                <input type="number" min="0" id="weight" value={inputs.weight} onChange={(e) => setInputs({ ...inputs, weight: parseFloat(e.target.value) })} />
                <label htmlFor="horsepower">Horsepower:</label>
                <input type="number" min="0" id="horsepower" value={inputs.hp} onChange={(e) => setInputs({ ...inputs, hp: parseFloat(e.target.value) })} />
                <label htmlFor="gears">Number of Gears:</label>
                <input type="number" min="0" id="gears" value={inputs.gears} onChange={(e) => setInputs({ ...inputs, gears: parseFloat(e.target.value) })} />
                <button type="submit">Update Car Info</button>
            </form>

        </div>

    )
}