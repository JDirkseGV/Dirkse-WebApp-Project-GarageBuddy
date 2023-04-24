import Image from "next/image"
import Link from "next/link"

export default function AccelerationCard() {
  return (
      <Link className="m-4 border-zinc-800 border-4 rounded w-96 flex flex-col items-center justify-between bg-zinc-400 hover:bg-zinc-100 hover:border-zinc-500" href={`/mygarage/acceleration`} >
          <Image className="rounded"
              src="/../public/wheelieCar.jpg"
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
