import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
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
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Send Reset Link
          </Button>
        </Stack>
      </form>
      {message && <Text mt={4}>{message}</Text>}
    </Box>
  );
}

export default PasswordResetRequest;