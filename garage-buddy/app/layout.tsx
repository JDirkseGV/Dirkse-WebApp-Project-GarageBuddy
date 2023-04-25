import { getServerSession } from "next-auth"
import { SessionProvider } from "../components/SessionProvider"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import "./globals.css"
import Login from "@/components/Login"
import { redirect } from "next/dist/server/api-utils"


export const metadata = {
  title: 'Garage Buddy',
  description: 'Use Machine Learning to analyze your cars performance',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body className="bg-gradient-to-r from-zinc-700 to-slate-500">
        <SessionProvider session={session}> {/*TODO: after getting sessions working go back and rework this to have guest accessible homepage before login is required*/}
          {!session ? (
            <div>
              <div className="flex justify-between bg-zinc-800 py-4 items-center flex-wrap">
                <a href="/" className="hover:bg-zinc-900 px-4 py-4 mx-2 rounded-md text-white text-center">Home</a>
                <div className="flex items-center justify-center p-2">
                  <p className="text-white">Sign in to build your garage:</p>
                  <Login />
                </div>
              </div>
              <div>{children}</div>
            </div>
          ): ( 
            <div>
              <div className="flex justify-between bg-zinc-800 py-4 items-center flex-wrap">
                <div>
                  <a href="/" className="hover:bg-zinc-900 px-4 py-4 mx-2 rounded-md text-white text-center">Home</a>
                  <a href="/mygarage" className="hover:bg-zinc-900 px-4 py-4 mx-2 rounded-md text-white text-center">My Garage</a> 
                </div>
                
                <div>
                  <Login />
                </div>
                
              
              </div>  
              
              <div>{children}</div>
            </div>
           )}  
          
        </SessionProvider>
      </body>
    </html>
  )
  
}
