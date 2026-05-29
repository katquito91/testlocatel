import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nova Store home page', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /nova store/i });
  expect(heading).toBeInTheDocument();
});
