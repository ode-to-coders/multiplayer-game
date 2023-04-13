import { MainPage } from '../pages';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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
  render(<MainPage/>);
  screen.debug();
  expect(screen.getByText(/Видео/i)).toBeInTheDocument();
});
