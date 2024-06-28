import { render, screen } from '@testing-library-react';
import { MemoryRouter } from 'react-router';

import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

// createServer => GET api/user => {user: null}
describe('<AuthButtons /> -- When user is NOT SIGNED IN', function () {
  test('When user is NOT signed in, sign in and sign up btns are VISIBLE', async function () {});

  test('When user is NOT signed in, Sign Out button IS NOT VISIBLE', async function () {});
});

// createServer => GET api/user => {user: {id: 3, email: "foo@email.com"}
describe('<AuthButtons /> -- When user is SIGNED IN', function () {
  test('When user is signed in, sign In and Sign Up btns are NOT visble', async function () {});

  test('When user is signed in, Sign Out IS VISIBLE', async function () {});
});
