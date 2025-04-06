import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { api } from "../api/endpoints";

function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/password-reset/", { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setMessage("Failed to send password reset link.");
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
          Reset Password
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" w="full">
              Send Reset Link
            </Button>
          </Stack>
        </form>
        {message && (
          <VStack mt={6} spacing={2}>
            <Text
              color={message.includes("Failed") ? "red.500" : "green.500"}
              fontWeight="bold"
            >
              {message}
            </Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default PasswordResetRequest;