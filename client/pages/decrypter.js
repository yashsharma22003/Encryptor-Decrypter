import { useEffect, useState } from "react"
import { useRouter } from "next/router";

const decrypter = () => {

    const [hash ,setHash ] = useState('');
    const [keyo ,setKeyo ] = useState('');
    const [keyt ,setKeyt ] = useState('');

    const router = useRouter();

    const handleHashEntry = (e) => {
        setHash(e.target.value);
    }

    const handleKeyoEntry = (e) => {
        setKeyo(e.target.value);
    }

    const handleKeytEntry = (e) => {
        setKeyt(e.target.value);
    }
     
   function handleDecryption() {

    router.push({
        pathname: '/decryptionResult',
        query: { hash:hash, keyOne: keyo, keyTwo: keyt}
    });

   }


    return (
        <div>

            <div className='w-screen h-screen flex items-center justify-center bg-blue-200'>

                <div className="flex flex-col content-evenly items-center justify-center h-1/2 w-1/4">
                    <input type='text' placeholder='Enter Hash Value' value={hash} onChange={handleHashEntry}
                        className=' border-4 rounded-lg border-none h-11 w-full p-4 m-4 ' />
                    <input type='text' placeholder='Enter Key 1' value={keyo} onChange={handleKeyoEntry}
                        className=' border-4 rounded-lg border-none h-11 w-full p-4 m-4 ' />
                         <input type='text' placeholder='Enter Key 2' value={keyt} onChange={handleKeytEntry}
                        className=' border-4 rounded-lg border-none h-11 w-full p-4 m-4 ' />
                </div>
                <button
                    className='ml-5 bg-red-200 p-2.5 rounded-lg'
                    onClick={handleDecryption}
                > Submit</button>

            </div>



        </div>

    )

}
export default decrypter