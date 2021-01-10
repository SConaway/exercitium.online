import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Student() {
  const [studentName, setStudentName] = useState('');
  const [studentTeam, setStudentTeam] = useState('');
  const [gameID, setGameID] = useState('');
  const boxBackground = useColorModeValue('#EDF2F7', '#171923');
  const borderColor = useColorModeValue('#718096', '#718096');

  let content;
  if (true)
    // socket.io not connected
    content = (
      <VStack
        spacing="24px"
        bg={boxBackground}
        p="48px"
        minWidth="40%"
        borderRadius="12px"
      >
        <FormControl id="name">
          <FormLabel>Please enter your name:</FormLabel>
          <Input
            type="text"
            value={studentName}
            borderColor={borderColor}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="Your name"
          />
        </FormControl>
        <FormControl id="team">
          <FormLabel>Please enter your team number:</FormLabel>
          <Input
            type="number"
            value={studentTeam}
            borderColor={borderColor}
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
            borderColor={borderColor}
            onChange={(event) => setGameID(event.target.value)}
            placeholder="Game ID"
          />
        </FormControl>
        <Button
          size="lg"
          colorScheme="green"
          as={Link}
          to="/studentsubmit"
          onClick={() => console.log('join...')}
        >
          Join!
        </Button>
      </VStack>
    );

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
      {content}
    </Box>
  );
}
