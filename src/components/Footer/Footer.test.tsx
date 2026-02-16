import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the footer element', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('displays the attribution text', () => {
    render(<Footer />);
    expect(screen.getByText(/Made with/)).toBeInTheDocument();
  });

  it('renders a link to the author website', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Ivan Storck/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.ivanstorck.com');
  });
});
