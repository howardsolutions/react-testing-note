import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

// createServer => GET api/user => {user: null}
describe('<AuthButtons /> --> When USER is NOT SIGNED IN', function () {
  createServer([
    {
      path: '/api/user',
      res: (req, res, ctx) => {
        return { user: null };
      },
    },
  ]);

  test('sign in and sign up btns are VISIBLE', async function () {
    await renderComponent();

    const signInButton = screen.getByRole('link', { name: /sign in/i });
    const signUpButton = screen.getByRole('link', { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/signin');
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute('href', '/signup');
  });

  test('Sign Out button IS NOT VISIBLE', async function () {
    await renderComponent();

    const signOutButton = screen.queryByRole('link', { name: /sign out/i });

    expect(signOutButton).not.toBeInTheDocument();
  });
});

/*
// createServer => GET api/user => {user: {id: 3, email: "foo@email.com"}
describe('<AuthButtons /> --> When USER is SIGNED IN', function () {
  test('sign In and Sign Up btns are NOT visble', async function () {
    renderComponent();
  });

  test('Sign Out IS VISIBLE', async function () {
    renderComponent();
  });
});
*/

async function renderComponent() {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );

  await screen.findAllByRole('link');
}

function pause() {
  return new Promise((resolve) => {
    return setTimeout(resolve, 100);
  });
}
