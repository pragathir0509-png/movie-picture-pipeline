import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App.jsx';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('Movie catalogue', () => {
  it('renders movie titles returned by the API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Example Movie', year: 2024, genre: 'Drama' }]
    }));
    render(<App />);
    expect(screen.getByRole('heading', { name: /featured movies/i })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Example Movie')).toBeInTheDocument());
  });

  it('shows an error when the API is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    render(<App />);
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });
});
