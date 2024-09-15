import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const decryptionResult = () => {

    const router = useRouter();
    const [decryptedText, setDecryptedText] = useState('*Tap Show Text To Know The Dcrypted Text*');
    const { hash, keyOne, keyTwo } = router.query;



    const fetchDecrypt = async () => {
        const response = await fetch(`http://localhost:8080/home/decrypt?hash=${hash}&keyOne=${keyOne}&keyTwo=${keyTwo}`);
        const decryptedTextResponse = await response.json();
        const text = decryptedTextResponse.DecryptedText.text;
        setDecryptedText(text);

    }


    return (
        <div> 
        

            <div className=" flex w-screen h-screen items-center justify-center bg-blue-200 ">
                <div className="w-1/2 bg-indigo-200 h-1/2 flex items-center justify-evenly flex-col text-lg">
           
                Decrypted Text:-

                     <h1 className="font-bold ">{decryptedText} </h1>
                
                     <button onClick={fetchDecrypt}  className="bg-green-300 py-2 px-2 rounded-xl " >Show Text</button>

                     
                     
                </div>
         



                <Link href="/">
            <button className="text-lg font-medium bg-cyan-500 text-white p-2 pt-2 ml-10 px-4 rounded ml-3">
            Home
            </button>
            </Link>


            </div>

        </div>

    )
}

export default decryptionResult;