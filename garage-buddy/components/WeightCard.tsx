import Link from "next/link";
import Image from "next/image"

type Properties = {
    path: string;
}

export default function WeightCard({ path }: Properties) {
    return (
        <Link className="m-4 border-zinc-800 border-4 rounded w-96 flex flex-col items-center justify-between bg-zinc-400 hover:bg-zinc-100 hover:border-zinc-500" href={`/mygarage/${path}`} >
            <Image className="rounded"
                src="/../public/carScales.png"
                alt="Car Image"
                width={470}
                height={400}
            />
            <div className="flex flex-col justify-between p-2">
                <p className="text-lg">Weight Predictor</p>
                <p>A machine learning model to predict the weight of your project car based on 0-60 time and horsepower.</p>
                
            </div>
        </Link>
    )
}