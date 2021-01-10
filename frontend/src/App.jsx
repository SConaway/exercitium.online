import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Welcome from './Welcome';

import {
  useColorMode,
  Button,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function App() {
  const { toggleColorMode } = useColorMode();

  const themeToggleText = useColorModeValue('dark', 'light');
  const ThemeSwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  return (
    <Router style={{ backgroundColor: 'pink' }}>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${themeToggleText} mode`}
        variant="ghost"
        color="current"
        ml={{ base: '0', md: '3' }}
        onClick={toggleColorMode}
        icon={<ThemeSwitchIcon />}
        style={{
          // I have to do this so it aligns to the viewport, not container
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
        border="1px"
        borderColor="gray.500"
      />
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
