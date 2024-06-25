import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
  const users = [
    { name: 'john', email: 'john@example.com' },
    { name: 'jane', email: 'jane@example.com' },
  ];

  // render the component
  render(<UserList users={users} />);

  // return list of users for the 2nd test
  return { users };
}

// USING `data-testid`

test('Render ONE row per user', () => {
  renderComponent();

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

test('Render the email and user name of each user in table row', () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
