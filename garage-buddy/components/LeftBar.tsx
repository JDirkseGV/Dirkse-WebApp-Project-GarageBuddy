'use client'

import { signOut, useSession } from "next-auth/react"

export default function LeftBar() {
    const { data: session } = useSession()
    console.log(session)

  return (
    <div className="flex flex-col h-screen p-2 bg-zinc-800 sm:w-48 md:w-64 justify-start items-center text-center text-white">
        {session && (
            <>
                <img className="h-12 w-12 rounded-full" src={session?.user?.image!} alt="Profile" />
                <p className="my-2">Your Garage</p>
                  
            </>
        )}
    </div>
  )
}
