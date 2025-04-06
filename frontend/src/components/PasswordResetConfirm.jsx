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
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/endpoints";

function PasswordResetConfirm() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await api.post(`/api/password-reset-confirm/${uidb64}/${token}/`, { password });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password.");
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
            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" w="full">
              Reset Password
            </Button>
          </Stack>
        </form>
        {message && (
          <VStack mt={6} spacing={2}>
            <Text
              color={message.includes("Failed") || message.includes("match") ? "red.500" : "green.500"}
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

export default PasswordResetConfirm;