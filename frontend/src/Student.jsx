import React, { useState, useEffect, useRef } from 'react';

import {
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  useColorModeValue,
  Heading,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import io from 'socket.io-client';

export default function Student() {
  const [studentName, setStudentName] = useState('');
  const [studentTeam, setStudentTeam] = useState('');
  const [answer, setAnswer] = useState('');

  const [gameID, setGameID] = useState('');

  const boxBackground = useColorModeValue('#EDF2F7', '#171923');
  const borderColor = useColorModeValue('#718096', '#718096');

  const [connected, setConnected] = useState(false);
  const [joinedGame, setJoinedGame] = useState(false);
  const [waitingForQuestion, setWaitingForQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    number: 0,
    text: '',
    submitted: false,
  });

  const socketRef = useRef(null);

  const toast = useToast();

  useEffect(() => {
    const socket = io(
      import.meta.env.MODE === 'production' ? '/' : 'http://localhost:5000',
    );
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

    socketRef.current = socket;

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  const join = () => {
    console.log(`join ${gameID}`);

    socketRef.current.emit('join-session', gameID, studentName, studentTeam);

    socketRef.current.on('question', (gameID, questionNumber, questionText) => {
      setCurrentQuestion({
        number: questionNumber,
        text: questionText,
        submitted: false,
      });
    });
  };

  const submit = () => {
    setCurrentQuestion({ ...currentQuestion, submitted: true });

    socketRef.current.emit(
      'submit',
      answer,
      studentTeam,
      question.number,
      gameID,
      studentName,
    );

    toast({
      title: 'Submitted!',
      description: `Your Answer: ${answer}`,
      status: 'info',
    });
  };

  let content;
  if (!joinedGame)
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
          <NumberInput
            // defaultValue={15}
            min={1}
            max={4}
            keepWithinRange={true}
            // clampValueOnBlur={false}
            borderColor={borderColor}
            value={studentTeam}
            onChange={setStudentTeam}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
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
            onSubmit={join}
          />
        </FormControl>
        <Button size="lg" colorScheme="green" onClick={join}>
          Join!
        </Button>
      </VStack>
    );

  if (connected && joinedGame)
    content = (
      <VStack
        spacing="24px"
        bg={boxBackground}
        p="48px"
        minWidth="40%"
        maxWidth="700px"
        borderRadius="12px"
      >
        <Heading fontSize="1.7rem" textAlign="center">
          {currentQuestion.number + 1}: {currentQuestion.text}
        </Heading>
        <FormControl id="game">
          <Input
            type="text"
            value={answer}
            borderColor={borderColor}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Your Answer"
          />
        </FormControl>
        <Button size="lg" colorScheme="green" onClick={submit}>
          {submitted ? 'Resubmit' : 'Submit'}
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
