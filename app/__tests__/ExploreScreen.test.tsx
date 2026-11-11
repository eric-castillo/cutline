import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {ClientTabs} from '../src/navigation/ClientTabs';
import {ExploreScreen} from '../src/screens/client/ExploreScreen';
import {formatMoney} from '../src/lib/format';
import {setLanguage} from '../src/i18n';

const metrics = {
  frame: {x: 0, y: 0, width: 390, height: 844},
  insets: {top: 0, left: 0, right: 0, bottom: 0},
};

afterEach(() => setLanguage('en'));

describe('formatMoney', () => {
  it('formats integer cents with Intl, dropping empty cents', () => {
    expect(formatMoney(2500, 'en')).toBe('$25');
    expect(formatMoney(2550, 'en')).toBe('$25.50');
  });

  it('uses a natural Spanish format for a US shop', () => {
    expect(formatMoney(2500, 'es')).toBe('$25');
  });
});

describe('ExploreScreen', () => {
  it('lists the sample services with price and duration', async () => {
    await render(
      <SafeAreaProvider initialMetrics={metrics}>
        <ExploreScreen />
      </SafeAreaProvider>,
    );
    expect(screen.getByText('Pick your service')).toBeTruthy();
    expect(screen.getByText('Haircut')).toBeTruthy();
    expect(screen.getByLabelText('Haircut, $25, 30 min')).toBeTruthy();
  });

  it('switches to Spanish immediately', async () => {
    await render(
      <SafeAreaProvider initialMetrics={metrics}>
        <ExploreScreen />
      </SafeAreaProvider>,
    );
    await fireEvent.press(screen.getByRole('radio', {name: 'Spanish'}));
    expect(await screen.findByText('Elige tu servicio')).toBeTruthy();
    expect(screen.getByText('Corte de cabello')).toBeTruthy();
  });
});

describe('ClientTabs', () => {
  it('shows the three tabs and marks Explore as selected', async () => {
    await render(
      <SafeAreaProvider initialMetrics={metrics}>
        <NavigationContainer>
          <ClientTabs />
        </NavigationContainer>
      </SafeAreaProvider>,
    );
    expect(screen.getByRole('tab', {name: 'Explore'})).toBeSelected();
    expect(screen.getByRole('tab', {name: 'My Appointments'})).toBeTruthy();
    expect(screen.getByRole('tab', {name: 'Profile'})).toBeTruthy();
  });

  it('switches tab and translates the labels', async () => {
    await render(
      <SafeAreaProvider initialMetrics={metrics}>
        <NavigationContainer>
          <ClientTabs />
        </NavigationContainer>
      </SafeAreaProvider>,
    );
    await fireEvent.press(screen.getByRole('tab', {name: 'Profile'}));
    expect(screen.getByRole('tab', {name: 'Profile'})).toBeSelected();

    await act(() => setLanguage('es'));
    expect(await screen.findByRole('tab', {name: 'Mis citas'})).toBeTruthy();
    expect(screen.getByRole('tab', {name: 'Perfil'})).toBeSelected();
  });
});
