import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
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
    try {
    if (password != confirmPassword){
        setMessage("password mismatch")
        return
    }
      const response = await api.post(`/api/password-reset-confirm/${uidb64}/${token}/`, { password });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password.");
    }
  };

  return (
    <Box>
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
          <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Reset Password
          </Button>
        </Stack>
      </form>
      {message && <Text mt={4}>{message}</Text>}
    </Box>
  );
}

export default PasswordResetConfirm;