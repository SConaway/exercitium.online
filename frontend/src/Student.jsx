import React, { useState } from 'react';

import {
  Container,
  Heading,
  Text,
  Stack,
  Center,
  Flex,
  VStack,
  useColorModeValue,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

export default function Student() {
  const [studentName, setStudentName] = useState('');
  const [studentTeam, setstudentTeam] = useState('');
  const [gameID, setGameID] = useState('');

  let content;
  if (true)
    // socket.io connected
    content = (
      <VStack spacing="24px">
        <FormControl id="name">
          <FormLabel>Please enter your name:</FormLabel>
          <Input
            type="text"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Your name"
          />
        </FormControl>
        <FormControl id="team">
          <FormLabel>Please enter your team number:</FormLabel>
          <Input
            type="number"
            value={studentTeam}
            onChange={(event) => setStudentTeam(event.target.value)}
            placeholder="Team #"
          />
        </FormControl>
        <FormControl id="game">
          <FormLabel>
            Please enter the ID of the game you are trying to join:
          </FormLabel>
          <Input
            type="text"
            value={gameID}
            onChange={(event) => setGameID(event.target.value)}
            placeholder="Game ID"
          />
        </FormControl>
        <Button
          size="lg"
          colorScheme="green"
          onClick={() => console.log('join...')}
        >
          Join!
        </Button>
      </VStack>
    );

  return (
    <Container
      // bg="tomato"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      {content}
    </Container>
  );
}
