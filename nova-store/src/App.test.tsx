import { render, screen } from '@testing-library/react';
import App from './App';
import { clearProductsCache } from './services/productRestService';

const fetchMock = jest.fn();

beforeEach(() => {
  clearProductsCache();
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => [],
  });
  global.fetch = fetchMock as unknown as typeof fetch;
});

test('renders Nova Store home page', async () => {
  render(<App />);
  const heading = await screen.findByRole('heading', { name: /nova store/i });
  expect(heading).toBeInTheDocument();
});
