import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

// USING `data-testid`

test('Render ONE row per user', () => {
  const users = [
    { name: 'john', email: 'john@example.com' },
    { name: 'jane', email: 'jane@example.com' },
  ];

  // render the component
  render(<UserList users={users} />);

  // Find all the rows in the table
  // const rows = screen.getAllByRole('row');

  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  // Assertion: Correct number of rows in the TABLE == number of users
  expect(rows).toHaveLength(2);
});

/*
  // Using querySelector - it worked just fine!

test('Render ONE row per user', () => {
  const users = [
    { name: 'john', email: 'john@example.com' },
    { name: 'jane', email: 'jane@example.com' },
  ];

  // render the component
  const { container } = render(<UserList users={users} />);

  // Find all the rows in the table
  // const rows = screen.getAllByRole('row');

  // eslint-disable-next-line
  const rows = container.querySelectorAll('tbody tr');

  // Assertion: Correct number of rows in the TABLE == number of users
  expect(rows).toHaveLength(2);
});
*/

test('Render the email and name of each user', () => {});
