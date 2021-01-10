import React, { useState, useRef, useEffect } from 'react';

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
  Flex,
  IconButton,
} from '@chakra-ui/react';
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  PlusSquareIcon,
} from '@chakra-ui/icons';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

import io from 'socket.io-client';

export default function Teacher() {
  const [gameID, setGameID] = useState('');

  const [questions, setQuestions] = useState(['']);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [numTeams, setNumTeams] = useState(2);
  const [submissions, setSubmissions] = useState([]);

  const [connected, setConnected] = useState(false);
  const [joinedGame, setJoinedGame] = useState(false);

  const socketRef = useRef(null);

  const toast = useToast();

  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const socket = io(import.meta.env['SNOWPACK_PUBLIC_SOCKET.IO_PATH']);
    socket.on('connect', () => {
      console.log('connected');
      setConnected(true);
    });

    socket.on('disconnect', (reason) => {
      console.log('disconnected');
      setConnected(false);

      toast({
        title: 'Disconnected from server',
        description: `${reason}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });

    socket.on(
      'answer-submitted',
      (answer, studentTeam, questionNumber, gameID, studentName) => {
        let modifiedSubmissions = [...submissions];

        modifiedSubmissions.push({
          answer,
          studentTeam,
          questionNumber,
          gameID,
          studentName,
        });

        setSubmissions(modifiedSubmissions);
      },
    );

    socketRef.current = socket;

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  const createGame = async () => {
    const response = await fetch('/game/start', {
      method: 'POST',
      body: JSON.stringify(questions),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      const json = await response.json();
      console.log(json);
      if (json.gamecode) {
        setGameID(json.gamecode);
        setJoinedGame(true);

        socketRef.current.emit(
          'join-session',
          gameID,
          // studentName,
          // studentTeam,
        );

        socketRef.current.emit(
          'join-session',
          `${gameID}-teacher`,
          // studentName,
          // studentTeam,
        );
      }
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

  const nextQuestion = () => {
    setSubmissions([]);
    setQuestionNumber(questionNumber + 1);
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

  if (gameID)
    content = (
      <>
        <VStack spacing="24px">
          <Text fontSize="lg">Game ID: {gameID}</Text>

          <Text fontSize="lg">
            Current Question: {questionNumber} • {questions[questionNumber]}
          </Text>

          <Table color="gray.500" minWidth="50%" maxWidth="700px">
            <TableHead>
              <TableRow>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Team Number</TableHeader>
                <TableHeader>Answer</TableHeader>
                <TableHeader />
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((item) => (
                <TableRow bg="white">
                  <TableCell>
                    <Text fontWeight="bold" fontSize="sm">
                      {item.studentName}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text fontWeight="bold" fontSize="sm">
                      {item.studentTeam}
                    </Text>
                  </TableCell>

                  <TableCell>
                    <Text fontSize="sm" color="gray.500">
                      {item.answer}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text fontSize="sm" color="gray.500">
                      <Flex>
                        <IconButton
                          mr="3px"
                          aria-label="Correct"
                          icon={<CheckIcon />}
                          onClick={() =>
                            socketRef.current.emit(
                              'validate',
                              item.studentTeam,
                              item.questionNumber,
                              item.studentName,
                              gameID,
                            )
                          }
                        />
                        <IconButton
                          aria-label="Incorrect"
                          icon={<CloseIcon />}
                          onClick={() =>
                            socketRef.current.emit(
                              'invalidate',
                              item.studentTeam,
                              item.questionNumber,
                              item.studentName,
                              gameID,
                            )
                          }
                        />
                      </Flex>
                    </Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            size="lg"
            colorScheme="green"
            onClick={nextQuestion}
            rightIcon={<ChevronRightIcon />}
          >
            Next Question
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
