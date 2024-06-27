import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RepositoriesListItem from './RepositoriesListItem';

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
}

describe('<RepositoriesListItem />', () => {
  test('shows a link to the github homepage for this repository', () => {
    renderComponent();
  });
});
