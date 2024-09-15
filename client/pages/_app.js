import "@/styles/globals.css";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { Header } from "./components/Header";

export default function App({ Component, pageProps }) {
  return (
    <ChakraBaseProvider>
      <Header/>
      <Component {...pageProps} />
    </ChakraBaseProvider>
  );
}
