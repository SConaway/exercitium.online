import React, { useState, useEffect } from 'react';

import {
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  useColorModeValue,
  Button,
  Box,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

function Welcome() {
  const buttonBackground = useColorModeValue('#fff', '#4A5568');
  const boxBackground = useColorModeValue('#EDF2F7', '#171923');

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      p={2}
    >
      <VStack spacing="24px" bg={boxBackground} p="48px" minWidth="40%" borderRadius="12px">
        <Heading align="center">Welcome to Exercitium!</Heading>
        <Text fontSize="lg" align="center">
          To get started, please choose Student or Teacher:
        </Text>
        <HStack
          // bg={buttonBackground}
          spacing="24px"
        >
          <Button as={RouterLink} to="/student" bg={buttonBackground} size="lg">
            Student
          </Button>
          <Button as={RouterLink} to="/teacher" bg={buttonBackground} size="lg">
            Teacher
          </Button>
          <Button as={RouterLink} to="/teacherwatch" bg={buttonBackground} size="lg">
            Teacher
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Welcome;
