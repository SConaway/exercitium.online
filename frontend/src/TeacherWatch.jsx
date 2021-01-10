import React, { useState } from 'react';

import {
  Text,
  VStack,
  useColorModeValue,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Link,
  IconButton,
  Flex,
} from '@chakra-ui/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

import { DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';

export default function Teacher() {
  const [gameID, setGameID] = useState('');

  const [questions, setQuestions] = useState(['']);
  const [numTeams, setNumTeams] = useState(2);

  const toast = useToast();

  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const createGame = async () => {
    const response = await fetch('/game/start', {
      method: 'POST',
      body: questions,
    });

    try {
      const json = await response.json();
      if (json.gamecode) setGameID(json.gamecode);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to create game.',
        description: `${error}.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  let content;
  if (!gameID)
    // socket.io connected
    content = (
      <>
        <Table color="gray.500" minWidth="50%" maxWidth="700px">
          <TableHead>
            <TableRow>
              <TableHeader>Team</TableHeader>
              <TableHeader>Question</TableHeader>
              <TableHeader>Answer</TableHeader>
              <TableHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow bg="white">
              <TableCell>
                <Text fontWeight="bold" fontSize="sm">
                  3
                </Text>
              </TableCell>
              <TableCell>
                <Text fontSize="sm" color="gray.500">
                  What is the craziest thing ever that you've seen? What is the
                  craziest thing ever that you've seen?
                </Text>
              </TableCell>
              <TableCell>
                <Text fontSize="sm" color="gray.500">
                  Spiders
                </Text>
              </TableCell>
              <TableCell>
                <Text fontSize="sm" color="gray.500">
                  <Flex>
                    <IconButton mr="3px" aria-label="Correct" icon={<Text>✓</Text>} />
                    <IconButton aria-label="Incorrect" icon={<Text>𐄂</Text>} />
                  </Flex>
                </Text>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button mt="20px">Next Question -></Button>
      </>
    );

  return (
    <Box
      // bg="tomato"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      {content}
    </Box>
  );
}
