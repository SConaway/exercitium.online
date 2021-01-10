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
} from '@chakra-ui/react';
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
        <VStack spacing="24px">
          <Text fontSize="lg">Please enter your questions below:</Text>
          {questions.length && (
            <Box
              border="1px"
              borderColor={borderColor}
              borderRadius="xl"
              p={10}
            >
              <VStack spacing="16px">
                {questions.map((item, index) => (
                  <VStack spacing="8px" key={index}>
                    <FormControl id={`question${index}`}>
                      <FormLabel>Question {index + 1}:</FormLabel>
                      <Input
                        type="text"
                        value={item}
                        onChange={(event) => {
                          let modifiedQuestions = [...questions];

                          modifiedQuestions[index] = event.target.value;

                          setQuestions(modifiedQuestions);
                        }}
                        placeholder={`Question ${index + 1}`}
                      />
                    </FormControl>
                    <Button
                      rightIcon={<DeleteIcon />}
                      onClick={() => {
                        let modifiedQuestions = [...questions];

                        modifiedQuestions.splice(index, 1);

                        setQuestions(modifiedQuestions);
                      }}
                      colorScheme="red"
                    >
                      Remove
                    </Button>
                  </VStack>
                ))}
              </VStack>
            </Box>
          )}
          <Button
            rightIcon={<PlusSquareIcon />}
            onClick={() => setQuestions([...questions, ''])}
          >
            Add Question
          </Button>

          <FormControl id="numTeams">
            <FormLabel>Number of teams:</FormLabel>
            <NumberInput
              // defaultValue={15}
              min={1}
              max={4}
              keepWithinRange={true}
              // clampValueOnBlur={false}
              value={numTeams}
              onChange={setNumTeams}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button size="lg" colorScheme="green" onClick={createGame}>
            Start game!
          </Button>
        </VStack>
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
