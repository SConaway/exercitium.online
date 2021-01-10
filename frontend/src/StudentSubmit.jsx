import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {
  VStack,
  Button,
  Input,
  FormControl,
  Heading,
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
      <VStack spacing="24px" bg={boxBackground} p="48px" minWidth="40%" maxWidth="700px"  borderRadius="12px">
        <Heading fontSize="1.7rem" textAlign="center">What is one plus one times twenty two?</Heading>
        <FormControl id="game">
          <Input
            type="text"
            value={gameID}
            borderColor={borderColor}
            onChange={(event) => setGameID(event.target.value)}
            placeholder="Your Answer"
          />
        </FormControl>
        <Button
          size="lg"
          colorScheme="green"
          onClick={() => console.log('join...')}
        >
          Submit
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
