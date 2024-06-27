import { screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RepositoriesListItem from './RepositoriesListItem';

/*
jest.mock('../tree/FileIcon.js', () => {
  // Content of FileIcon.js
  return () => {
    return 'File Icon Component';
  };
});
*/

function renderComponent() {
  const repository = {
    full_name: 'fake facebook',
    language: 'Python',
    description: 'A python lib',
    owner: 'facebook',
    name: 'react',
    html_url: 'https://github.com/facebook/react',
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};

describe('<RepositoriesListItem />', () => {
  test('shows a link to the github homepage for this repository', async () => {
    const { repository } = renderComponent();

    await screen.findByRole('img', { name: 'Python' });

    const link = screen.getByRole('link', { name: /github repository/i });
    expect(link).toHaveAttribute('href', repository.html_url);
  });
});

// When using module Mocking - it's terrible technique but it worked! :v
// // the fileIcon Component causing the issue, we skipped importing that component!
// describe('<RepositoriesListItem />', () => {
//   test('shows a link to the github homepage for this repository', async () => {
//     renderComponent();
//   });
// });

// Example with using act function
/*
describe('<RepositoriesListItem />', () => {
  test('shows a link to the github homepage for this repository', async () => {
    renderComponent();

    await act(async () => {
      await pause();
    });
  });
});

*/
