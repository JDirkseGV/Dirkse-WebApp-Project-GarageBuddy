'use client'

import { signOut, useSession } from "next-auth/react"

export default function LeftBar() {
    const { data: session } = useSession()
    console.log(session)

  return (
    <div className="flex flex-col h-screen p-2 bg-zinc-800 w-1/4 justify-start items-center text-center text-white">
        {session && (
            <>
                <img className="h-12 w-12 rounded-full" src={session.user?.image!} alt="Profile" />
                <p className="my-2">{session.user?.email}</p>
                  <button onClick={() => signOut()} className="bg-sky-500 rounded-md px-2 py-1 my-2 hover:bg-sky-700">Logout</button>
            </>
        )}
    </div>
  )
}
