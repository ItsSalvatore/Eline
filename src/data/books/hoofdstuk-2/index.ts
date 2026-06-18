import { Book } from '../../../types';

export const hoofdstuk2: Book = {
  id: 'hoofdstuk-2',
  number: 2,
  title: 'Hoofdstuk 2',
  subtitle: 'Binnenkort',
  dateRange: 'Wordt nog geschreven',
  description:
    'Een nieuw boekdeel ligt al klaar, maar de bladzijdes blijven nog even verzegeld.',
  coverColor: '#F0EBE8',
  textColor: '#8B0000',
  locked: true,
  sortOrder: 2,
  pages: [
    {
      id: 1,
      title: 'Hoofdstuk 2',
      subtitle: 'Binnenkort',
      content:
        'Ons verhaal gaat door.\n\nMeer momenten, meer herinneringen, meer mijlpalen samen.\n\nDit hoofdstuk komt binnenkort.',
      icon: 'sparkle',
      backgroundColor: '#F0EBE8',
      textColor: '#8B0000',
      unlocked: false,
      date: 'Binnenkort',
      isBentoMenu: true,
    },
  ],
};
