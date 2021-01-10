import React from 'react';
import { render, screen } from '../../testUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

test('renders a table', () => {
  render(
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Title</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Bernard Lane</TableCell>
          <TableCell>Director, Human Resources</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );

  const table = screen.getByRole('table');
  expect(table).toHaveTextContent(/Name/);
  expect(table).toHaveTextContent(/Title/);
  expect(table).toHaveTextContent(/Bernard Lane/);
  expect(table).toHaveTextContent(/Director, Human Resources/);
});
