import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react-native';
import {Button} from '../src/components/Button';
import {Chip} from '../src/components/Chip';
import {LangToggle} from '../src/components/LangToggle';
import {StatusBadge} from '../src/components/StatusBadge';
import i18n, {setLanguage} from '../src/i18n';

afterEach(() => setLanguage('en'));

describe('Button', () => {
  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(<Button label="Book" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', {name: 'Book'}));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled and exposes the state', async () => {
    const onPress = jest.fn();
    await render(<Button label="Book" onPress={onPress} disabled />);
    const button = screen.getByRole('button', {name: 'Book'});
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('does not fire while loading and is marked busy', async () => {
    const onPress = jest.fn();
    await render(<Button label="Book" onPress={onPress} loading />);
    const button = screen.getByRole('button', {name: 'Book'});
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
  });
});

describe('Chip', () => {
  it('is interactive and reports selection when it has onPress', async () => {
    const onPress = jest.fn();
    await render(<Chip label="Morning" selected onPress={onPress} />);
    const chip = screen.getByRole('button', {name: 'Morning'});
    expect(chip).toBeSelected();
    await fireEvent.press(chip);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is plain content without onPress', async () => {
    await render(<Chip label="Morning" />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('Morning')).toBeTruthy();
  });
});

describe('StatusBadge', () => {
  it('shows the status as text, in both languages', async () => {
    await render(<StatusBadge status="noShow" />);
    expect(screen.getByText('No-show')).toBeTruthy();
    await act(() => setLanguage('es'));
    expect(await screen.findByText('No asistió')).toBeTruthy();
  });
});

describe('LangToggle', () => {
  it('switches the app language and marks the active segment', async () => {
    await render(<LangToggle />);
    expect(screen.getByRole('radio', {name: 'English'})).toBeSelected();

    await fireEvent.press(screen.getByRole('radio', {name: 'Spanish'}));

    expect(i18n.language).toBe('es');
    expect(await screen.findByRole('radio', {name: 'Español'})).toBeSelected();
  });
});
