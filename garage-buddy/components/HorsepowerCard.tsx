import Image from "next/image"
import Link from "next/link"

export default function HorsepowerCard() {
    return (
        <Link className="m-4 border-zinc-800 border-4 rounded w-96 flex flex-col items-center justify-between bg-zinc-400 hover:bg-zinc-100 hover:border-zinc-500" href={`/mygarage/horsepower`} >
            <Image className="rounded"
                src="/../public/dynoGraph.jpg"
                alt="Car Image"
                width={400}
                height={400}
            />
            <div className="flex flex-col justify-between p-2">
                <p className="text-lg">Horsepower Predictor</p>
                <p>A machine learning model to predict the horsepower of your project car based on 0-60 time and weight.</p>
                <p></p>
            </div>
        </Link>
    )
}