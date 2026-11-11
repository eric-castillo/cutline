import i18n, {setLanguage} from '../src/i18n';

describe('i18n', () => {
  afterEach(() => setLanguage('en'));

  it('translates and switches between English and Spanish', async () => {
    await setLanguage('en');
    expect(i18n.t('tabs.appointments')).toBe('My Appointments');
    await setLanguage('es');
    expect(i18n.t('tabs.appointments')).toBe('Mis citas');
  });

  it('interpolates named params in both languages', async () => {
    await setLanguage('es');
    expect(i18n.t('explore.duration', {minutes: 30})).toBe('30 min');
  });
});
