'use client'

import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import HpHistory from "@/components/HpHistory";

type Properties = {
    params: {
        id: string;
    }
}

export default function Horsepower({ params: { id } }: Properties) {
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
        gears: 0,
        accTime: 0
    })
    const [modelPrediction, setPrediction] = useState({
        prediction: 0
    })

    const [history, loadingHistory, error] = useCollection(
        session && collection(db, "users", session.user?.email!, "cars", id, "horsepower predictions")
    )

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

    const createHpEntry = async (pred: number) => {
        const doc = await addDoc(collection(db, 'users', session?.user?.email!, 'cars', id, 'horsepower predictions'), {
            weight: inputs.weight,
            gears: inputs.gears,
            accTime: inputs.accTime,
            prediction: pred
        });
    }

    useEffect(() => {
        console.log("loading client side data...")
        loadData()
    }, []);

    const getHp = async (e: FormEvent<HTMLFormElement>) => {
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
            createHpEntry(Number((hpPrediction.prediction).toFixed(2)))
            // create card from inputs and prediction value
        }
        catch (error) {
            console.log("error : " + error)
        }

    }



    return (
        <div className="flex flex-row justify-evenly">
            <div className="">
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
                <h1 className="text-2xl text-white mb-6">Machine Learning Horsepower Predictor</h1>
                <div className="bg-zinc-800 rounded-lg p-4">
                    <p className="text-white text-3xl">Horsepower: {Number((modelPrediction.prediction).toFixed(2))}hp</p>
                </div>
                <h1 className="text-2xl text-white mb-6">(current accuracy is +/- 22hp)</h1>
                <form className="mb-6 flex flex-col" onSubmit={getHp}>
                    <div className="bg-sky-500 px-8 rounded-lg mb-4">
                        <label htmlFor="weight" className="block text-2xl py-2">Curb Weight(lbs):</label>
                        <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="weight" value={inputs.weight} onChange={(e) => setInputs({ ...inputs, weight: parseFloat(e.target.value) })} />
                    </div>
                    <div className="bg-sky-500 px-8 rounded-lg mb-4">
                        <label htmlFor="gears" className="block text-2xl py-2">Number of Gears:</label>
                        <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="gears" value={inputs.gears} onChange={(e) => setInputs({ ...inputs, gears: parseFloat(e.target.value) })} />
                    </div>
                    <div className="bg-sky-500 px-8 rounded-lg mb-4">
                        <label htmlFor="accTime" className="block text-2xl py-2">0-62 Time:</label>
                        <input className="mb-6 rounded text-2xl p-1" type="number" min="0" step="any" id="accTime" value={inputs.accTime} onChange={(e) => setInputs({ ...inputs, accTime: parseFloat(e.target.value) })} />
                    </div>
                    <button className="mb-6 rounded-md text-2xl bg-sky-500 p-2 hover:bg-sky-700" type="submit">Calculate Horsepower</button>
                </form>
            </div>

            <div className="flex flex-col m-2 items-center">
                <p className="text-xl text-white">{carData.make} {carData.model} Prediction History</p>
                {loadingHistory && <span className="text-lg text-white">Collection: Loading...</span>}
                {history && history?.docs?.map(card => (
                    <HpHistory key={card.id} id={card.id} carId={id} weight={card.data().weight} gears={card.data().gears} accTime={card.data().accTime} prediction={card.data().prediction} />
                ))}
            </div>
        </div>

    )
}