import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationPermissionPrompt } from './LocationPermissionPrompt';

describe('LocationPermissionPrompt', () => {
  it('should render the welcome message', () => {
    const mockOnRequestPermission = vi.fn();
    render(
      <LocationPermissionPrompt
        onRequestPermission={mockOnRequestPermission}
      />,
    );

    expect(
      screen.getByRole('heading', { name: /Welcome to Speed & Position/i }),
    ).toBeInTheDocument();
  });

  it('should explain what the app does', () => {
    const mockOnRequestPermission = vi.fn();
    render(
      <LocationPermissionPrompt
        onRequestPermission={mockOnRequestPermission}
      />,
    );

    expect(
      screen.getByText(/shows you how fast you're going and where you are/i),
    ).toBeInTheDocument();
  });

  it('should explain why location permission is needed', () => {
    const mockOnRequestPermission = vi.fn();
    render(
      <LocationPermissionPrompt
        onRequestPermission={mockOnRequestPermission}
      />,
    );

    expect(
      screen.getByText(/we need access to your device's location/i),
    ).toBeInTheDocument();
  });

  it('should assure user about privacy', () => {
    const mockOnRequestPermission = vi.fn();
    render(
      <LocationPermissionPrompt
        onRequestPermission={mockOnRequestPermission}
      />,
    );

    expect(
      screen.getByText(/Your location data stays on your device/i),
    ).toBeInTheDocument();
  });

  it('should render the enable button', () => {
    const mockOnRequestPermission = vi.fn();
    render(
      <LocationPermissionPrompt
        onRequestPermission={mockOnRequestPermission}
      />,
    );

    expect(
      screen.getByRole('button', { name: /Enable Location Access/i }),
    ).toBeInTheDocument();
  });

  it('should call onRequestPermission when button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnRequestPermission = vi.fn();
    render(
      <LocationPermissionPrompt
        onRequestPermission={mockOnRequestPermission}
      />,
    );

    const button = screen.getByRole('button', {
      name: /Enable Location Access/i,
    });
    await user.click(button);

    expect(mockOnRequestPermission).toHaveBeenCalledTimes(1);
  });

  it('should inform user about browser prompt', () => {
    const mockOnRequestPermission = vi.fn();
    render(
      <LocationPermissionPrompt
        onRequestPermission={mockOnRequestPermission}
      />,
    );

    expect(
      screen.getByText(/You'll be prompted by your browser/i),
    ).toBeInTheDocument();
  });
});
