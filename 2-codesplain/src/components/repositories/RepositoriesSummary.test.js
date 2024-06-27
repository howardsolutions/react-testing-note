import { screen, render } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('displays information about the repository', () => {
  // Append: Prepare for the test
  const repository = {
    language: 'Python',
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };

  render(<RepositoriesSummary repository={repository} />);

  // Act: actually do the test

  for (let key in repository) {
    const repositoryFieldValue = repository[key];

    const element = screen.getByText(new RegExp(repositoryFieldValue));

    expect(element).toBeInTheDocument();
  }
});

/*
test('displays the primary language of the repository', () => {
  // Append: Prepare for the test
  const repository = {
    language: 'Python',
    stargazers_count: 5,
    forks: 30,
    open_issues: 3,
  };

  render(<RepositoriesSummary repository={repository} />);

  // Act: actually do the test

  const language = screen.getByText('Python');

  // Assert
  expect(language).toBeInTheDocument();
});
*/
