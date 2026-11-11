import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from '../App';
import i18n, {setLanguage} from '../src/i18n';

afterEach(() => setLanguage('en'));

describe('App', () => {
  it('renders the client tabs', async () => {
    await render(<App />);
    expect(await screen.findByRole('tab', {name: 'Explore'})).toBeSelected();
  });

  it('restores the saved language on start', async () => {
    await setLanguage('es');
    await i18n.changeLanguage('en');
    await render(<App />);
    expect(await screen.findByRole('tab', {name: 'Explorar'})).toBeSelected();
  });
});
