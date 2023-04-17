import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LeaderBoardPage } from 'pages/LeaderBoardPage';

import ratings from '../../../mocks/ratings.json';

const сontent = 'Не туда попали';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

test('Example test', async () => {
  const { getByText } = render(<div>Не туда попали</div>);
  expect(getByText(сontent)).toBeDefined();
});

test('Main page render', () => {
  render(<LeaderBoardPage users={ratings} />);
  screen.debug();
  expect(screen.getByText(/Всего игр/i)).toBeInTheDocument();
});
