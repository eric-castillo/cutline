import type {Language} from '../../i18n';

/**
 * Fixed sample data for the Slice 0 spike only. Slice 1 replaces it with the
 * simulated API (CutlineApi.getServices); screens must never import mock data.
 * Prices are integer cents; names are translatable {en, es}.
 */
export type SampleService = {
  id: string;
  name: Record<Language, string>;
  durationMinutes: number;
  priceCents: number;
};

export const SAMPLE_SERVICES: SampleService[] = [
  {
    id: 'haircut',
    name: {en: 'Haircut', es: 'Corte de cabello'},
    durationMinutes: 30,
    priceCents: 2500,
  },
  {
    id: 'fade',
    name: {en: 'Skin fade', es: 'Degradado a piel'},
    durationMinutes: 45,
    priceCents: 3000,
  },
  {
    id: 'beard',
    name: {en: 'Beard trim', es: 'Arreglo de barba'},
    durationMinutes: 20,
    priceCents: 1500,
  },
  {
    id: 'hot-towel-shave',
    name: {en: 'Hot towel shave', es: 'Afeitado con toalla caliente'},
    durationMinutes: 30,
    priceCents: 2800,
  },
  {
    id: 'kids',
    name: {en: 'Kids cut', es: 'Corte infantil'},
    durationMinutes: 25,
    priceCents: 1800,
  },
  {
    id: 'combo',
    name: {en: 'Cut and beard', es: 'Corte y barba'},
    durationMinutes: 60,
    priceCents: 4000,
  },
];
