import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders Velora', () => {
    render(<App />);
    expect(screen.getByText('Velora')).toBeInTheDocument();
  });
});
