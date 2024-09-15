
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, useToast, Text} from '@chakra-ui/react';
import Link from "next/link";



const encryptionIndex = () => {

    const router = useRouter();
    const { id } = router.query;
    const toast = useToast();



    const [responseJson, setResponseJson] = useState('');


    useEffect(() => {

        const encrypter = async (id) => {

            const encryptedText = await fetch(`http://localhost:8080/home/alltext/${id}`, {
                method: 'POST'
            });
            const json = await encryptedText.json();
            setResponseJson(json);
        }

        encrypter(id);
    }, [])

    async function deleteText() {
        const deleteRes = await fetch(`http://localhost:8080/home/alltext/${id}`, {
            method: 'DELETE'
        }
        )

        await deleteRes.json()
        router.push('/alltext');

        toast({
            render: () => (
              <Box
                p={4}                       // Padding for better spacing
                bg="red.800"               // Darker background color for contrast
                color="white"               // Text color
                borderRadius="md"           // Medium border radius for rounded corners
                boxShadow="lg"              // Larger shadow for depth
                maxWidth="360px"            // Slightly wider max width
                margin="0 auto"             // Center the toast
                textAlign="center"          // Center text alignment
              >                           
                <Text fontSize="md">      
                  Text Has Been Deleted From The List
                </Text>
              </Box>
            ),
            duration: 5000,               // Duration of the toast
            isClosable: true,             // Toast is closable
          });
    }

    console.log("response Json is", responseJson);

    


    return (
        <div className=" flex w-screen h-screen items-center justify-center bg-blue-200 ">


            {responseJson ?


                <div className="w-1/2 bg-indigo-200 h-1/2 flex items-center justify-evenly flex-col text-lg">

                    Encrypted Hash:-  <h1 className="font-bold "> {responseJson.encryptedText} </h1>
                    Key 1 🗝️:    <h1 className="w-full  font-bold px-4"> {responseJson.key}</h1>
                    Key 2 🗝️:   <h1 className="w-full  font-bold px-4" >{responseJson.randomness} </h1>

                    {/* <button className="bg-red-300 py-2 px-2 rounded-xl " onClick={deleteText}> Delete Original Text</button> */}
                    <h1 className="font-bold text-red-900 text-sm">  *Please Copy The Details before they are lost forever  </h1>

                    <Link href="/">
            <button className="text-lg font-medium bg-cyan-500 text-white py-2 px-4 p-4 rounded ml-3">
            Home
            </button>
            </Link>

                </div> :
                <div className="flex">
                    <h1 className="font-bold text-2xl"> Return To Home  👉 </h1> 
                    <Link href="/">
            <button className="text-lg font-medium bg-cyan-500 text-white p-2 pt-2 ml-10 px-4 rounded ml-3">
            Home
            </button>
            </Link>
                    </div>


            }

            




        </div>
    )

}

export default encryptionIndex;