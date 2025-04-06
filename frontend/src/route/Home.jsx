import { Box, Heading, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { isAuthenticated } from "../api/endpoints";
import { useState, useEffect} from "react";

function Home() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetch = async () =>{
      try{
        const response = await isAuthenticated();
        setUsername(response.user)
      }catch(error){
        return({'error':error})
      }
    }
    fetch();
  },[])
  return (
    <>
      <Navbar />
      <Box
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-br, teal.400, blue.500)"
        color="white"
        px={4}
      >
        <Heading mb={4} size="2xl">
          Welcome to the Home Page <b>{username}</b>!
        </Heading>
        <Text fontSize="lg">
          You are successfully logged in. Feel free to explore the app.
        </Text>
      </Box>
    </>
  );
}

export default Home;