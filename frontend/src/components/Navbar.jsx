import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
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