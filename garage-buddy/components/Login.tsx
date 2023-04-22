'use client'
import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <div className="flex justify-center items-center">
        {/*TODO: could put image here, if I do I need to remember to edit next.config.js to allow for image domains if I use something from the web */}
        <button onClick={() => signIn('google')}>Sign In with Google</button>
    </div>
  )
}
