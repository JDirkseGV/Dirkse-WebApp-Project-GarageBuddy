'use client'
import { signIn, signOut, useSession } from "next-auth/react"

export default function Login() {
    const {data:session} = useSession()
    if (session) {
        return(
            <div className="flex items-center mx-2">
                <p className="mx-2 text-white">Signed in as {session?.user?.email!}</p>
                <img className="h-12 w-12 rounded-full mx-2" src={session?.user?.image!} alt="Profile" />
                <button onClick={() => signOut()} className="bg-sky-500 rounded-md px-2 mx-2 py-1 my-2 hover:bg-sky-700">Logout</button>
            </div>
            
        )
    }
    return (
        <div className="flex">
            <button onClick={() => signIn()} className="bg-sky-500 rounded-md mx-2 px-2 py-1 my-2 hover:bg-sky-700">Sign In</button>
        </div>
  )
}
