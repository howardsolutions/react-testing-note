import { render, screen } from '@testing-library/react';
import UserList from './UserList';

test('Render ONE row per user', () => {
  const users = [
    { name: 'john', email: 'john@example.com' },
    { name: 'jane', email: 'jane@example.com' },
  ];

  // render the component
  render(<UserList users={users} />);

  // Find all the rows in the table
  const rows = screen.getAllByRole('row');

  // Assertion: Correct number of rows in the TABLE == number of users
  expect(rows).toHaveLength(2);
});

test('Render the email and name of each user', () => {});
