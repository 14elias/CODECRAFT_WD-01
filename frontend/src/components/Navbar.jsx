import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/endpoints";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout(); // Call the logout API
      console.log(response.message); // Log the success message
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Box bg="teal.500" px={4} py={3} color="white">
      <Flex alignItems="center">
        <Heading size="md">My App</Heading>
        <Spacer />
        <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
}

export default Navbar;