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

test('it calls onUserAdd when the form is submitted', async () => {
  // render component
  const mock = jest.fn();

  render(<UserForm onUserAdd={mock} />);
  // find 2 inputs
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

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
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: 'john',
    email: 'blabla@email.com',
  });
});

// A touch on TDD - Test Driven Development. Write a failed test case first, and implement to fix in the code
test('empties the 2 inputs when the form is submitted', async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  const button = screen.getByRole('button');

  await user.click(nameInput);
  await user.keyboard('jane');

  await user.click(emailInput);
  await user.keyboard('jane@email.com');

  await user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});

// Work but not the best way!
/*
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
*/
