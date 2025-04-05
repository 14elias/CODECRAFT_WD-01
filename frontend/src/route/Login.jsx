import { useState } from "react";
import { login } from "../api/endpoints";
import {
  Box,  Button, FormControl, FormLabel, Heading, Input, Stack, Text, Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tokens = await login(userName, password);
      nav('/home')
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, teal.400, blue.500)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        maxW="md"
        w="full"
      >
        <Heading mb={6} size="lg" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" w="full" onClick={handleSubmit}>
              Login
            </Button>
          </Stack>
        </form>

        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <Link color="teal.600" href="/register">
            Sign up
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Login;
