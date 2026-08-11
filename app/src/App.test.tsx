import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the Role Select entry screen at /', () => {
    render(<App />);
    expect(screen.getByText(/Where brands and makers find their fit/i)).toBeInTheDocument();
  });
});
