import React, { useState, useEffect } from 'react';

import {
  Heading,
  Text,
  Stack,
  VStack,
  useColorModeValue,
  Button,
  Box,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

function Welcome() {
  const buttonBackground = useColorModeValue('grey.100', 'grey.800');

  return (
    <Box
      // bg="tomato"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      p={2}
    >
      <VStack spacing="24px">
        <Heading align="center">Welcome to exercitium.online!</Heading>
        <Text fontSize="lg" align="center">
          To get started, please choose Student or Teacher:
        </Text>
        <Stack
          // bg={buttonBackground}
          spacing="24px"
        >
          <Button as={RouterLink} to="/student" size="lg">
            Student
          </Button>
          <Button as={RouterLink} to="/teacher" size="lg">
            Teacher
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
}

export default Welcome;
