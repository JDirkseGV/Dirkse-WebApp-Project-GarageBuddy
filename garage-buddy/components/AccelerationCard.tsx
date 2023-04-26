import Image from "next/image"
import Link from "next/link"

type Properties = {
    path: string;
}

export default function AccelerationCard({ path }: Properties) {
  return (
      <Link className="mx-12 my-4 border-zinc-800 border-4 rounded w-96 flex flex-col items-center justify-between bg-zinc-400 hover:bg-zinc-100 hover:border-zinc-500" href={`/mygarage/${path}`} >
          <Image className=""
              src="/public/wheelieCar.jpg"
              alt="Car Image"
              width={600}
              height={500}
          />
          <div className="flex flex-col justify-between p-2">
              <p className="text-lg">Acceleration Predictor</p>
              <p>A machine learning model to predict the 0-60 time of your project car based on horsepower and weight.</p>
          </div>
      </Link>
  )
}
