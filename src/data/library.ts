import { Library } from '../types';
import { books } from './books';

export const library: Library = {
  id: 'eline-library',
  title: 'Voor Eline',
  subtitle: 'Ons Verhaal',
  dedication:
    'Een bibliotheek van momenten, boek voor boek opgebouwd. Hoofdstuk 1 staat open; Hoofdstuk 2 wacht nog achter het lint.',
  books,
};
