import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
  // render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // Assertion - make sure the component is doing
  // what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

// Work but not the best way!
test('it calls onUserAdd when the form is submitted', async () => {
  // render component
  const argList = [];

  const callback = (...args) => {
    argList.push(args);
  };

  render(<UserForm onUserAdd={callback} />);
  // find 2 inputs
  const [nameInput, emailInput] = screen.getAllByRole('textbox');

  // simulate typing a name
  await user.click(nameInput);
  await user.keyboard('john');
  // simulate typing an email
  await user.click(emailInput);
  await user.keyboard('blabla@email.com');
  // Find the button
  const button = screen.getByRole('button');

  // simulate clicking on btn
  await user.click(button);

  // assertion to make sure onUserAdd gets called with email and name
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: 'john', email: 'blabla@email.com' });
});
