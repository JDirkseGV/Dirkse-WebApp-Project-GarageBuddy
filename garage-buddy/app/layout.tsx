import "./globals.css"


export const metadata = {
  title: 'Garage Buddy',
  description: 'Use Machine Learning to analyze your cars performance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-zinc-700">
        <div className="flex justify-between bg-zinc-800 py-4 rounded-md">
          <div className="text-white px-4">
            <a href="/" className="hover:bg-zinc-900 px-4 py-4 rounded-md">Home</a>
            <a href="/mygarage" className="hover:bg-zinc-900 px-4 py-4 rounded-md">My Garage</a>
          </div>
          <div className='px-4'>
            <div></div>
            <a href="/login" className="bg-sky-500 mx-2 px-4 rounded-md py-2 text-sm hover:bg-sky-700">Log In</a>
            <a href="/signup" className="bg-sky-500 mx-2 px-4 rounded-md py-2 text-sm hover:bg-sky-700">Sign Up</a>
          </div>
        </div>  
      
        {children}
      </body>
    </html>
  )
}
