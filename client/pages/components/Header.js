import Link from "next/link"

export const Header = () => {

    return(
        <div className="w-screen h-20 bg-teal-100 relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
      

            

            <Link href="/">
            <button className="text-sm font-medium bg-cyan-500 text-white py-2 px-4 rounded ml-3">
            Encrypter
            </button>
            </Link>

            <Link href="/decrypter">
            <button className="text-sm font-medium bg-cyan-500 text-white py-2 px-4 rounded ml-3">
            Decrypter
            </button>
            </Link>
{/* 
            <Link href="/alltext">
            <button className="text-sm font-medium bg-cyan-500 text-white py-2 px-4 rounded ml-3">
            Previous Text Entries
            </button>
            </Link> */}

            
        </div>
           
        <div className="flex justify-center items-center h-full">
            <h2 className="text-3xl font-bold text-cyan-500">Data Encrypter</h2>
            
        </div>


        
    </div>
    )
}