'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

export default function Login() {
    const { data: session } = useSession()
    if (session) {
        return (
            <Link className="m-4 border-zinc-800 border-4 rounded flex flex-col items-center justify-between bg-zinc-400 hover:bg-zinc-100 hover:border-zinc-500" href={`/mygarage`} >
                <Image className="rounded"
                    src="/../public/garage.jpeg"
                    alt="Car Image"
                    width={800}
                    height={800}
                />
                <div className="flex flex-col justify-between p-2">
                    <p className="text-lg">Your Garage</p>
                    <p>A place to keep track of your projects and save machine learning insights about your vehicles.</p>
                    <p></p>
                </div>
            </Link>
        )
    }
    return (
        <div onClick={() => signIn()} className="m-4 border-zinc-800 border-4 rounded flex flex-col items-center justify-between bg-zinc-400 hover:bg-zinc-100 hover:border-zinc-500 hover:cursor-pointer" >
                <Image className="rounded"
                    src="/../public/garage.jpeg"
                    alt="Car Image"
                    width={800}
                    height={800}
                />
                <div className="flex flex-col justify-between p-2">
                    <p className="text-lg">Your Garage</p>
                    <p>A place to keep track of your projects and save machine learning insights about your vehicles.</p>
                    <p></p>
                </div>
            </div>
    )
}