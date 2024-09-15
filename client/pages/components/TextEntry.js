import React, { useEffect, useState } from 'react';
import { Box, useToast, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';  // Import useRouter from next/router

export function TextEntry() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [submitted, setSubmitted] = useState(false); // Add state to track submission
  const toast = useToast();
  const router = useRouter(); // Initialize router

  const handleTextEntry = (e) => {
    setText(e.target.value);
  };

  const submitText = async () => {
    if (text === '') {
      toast({
        render: () => (
          <Box
            p={4}
            bg="red.800"
            color="white"
            borderRadius="md"
            boxShadow="lg"
            maxWidth="360px"
            margin="0 auto"
            textAlign="center"
          >
            <Text fontSize="md">Atleast Type An Single Character</Text>
          </Box>
        ),
        duration: 5000,
        isClosable: true,
      });
      return; // Exit if validation fails
    }

    try {
      const res = await fetch("http://localhost:8080/home/input", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResponse(data);
      setSubmitted(true); // Update submitted state

      toast({
        render: () => (
          <Box
            p={4}
            bg="green.800"
            color="white"
            borderRadius="md"
            boxShadow="lg"
            maxWidth="360px"
            margin="0 auto"
            textAlign="center"
          >
            <Text fontSize="md">Text Was Successfully Encrypted!</Text>
          </Box>
        ),
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting text:', error);
    }
  };

  useEffect(() => {
    if (submitted && response) {
      router.push({
        pathname: '/encryptionIndex',
        query: { id: response } // Convert response to string
      });
    }
  }, [submitted, response, router]);

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-blue-200'> 
      <input
        type='text'
        onChange={handleTextEntry}
        value={text}
        placeholder='Enter Text To Be Encrypted'
        className='border-4 rounded-lg border-none h-11 w-1/4 p-4'
      />
      <button
        onClick={submitText}
        className='ml-5 bg-red-200 p-2.5 rounded-lg'
      >
        Submit
      </button>
    </div>
  );
}
