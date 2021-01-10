import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Welcome from './Welcome';
import Student from './Student';
import Teacher from './Teacher';

import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function App() {
  const { toggleColorMode } = useColorMode();

  const themeToggleText = useColorModeValue('dark', 'light');
  const ThemeSwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/student">
          <Student />
        </Route>
        <Route path="/teacher">
          <Teacher />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>

      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${themeToggleText} mode`}
        variant="outline"
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
      />
    </Router>
  );
}
