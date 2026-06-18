import { Book } from '../../../types';
import { hoofdstuk1Intro } from './intro';
import { hoofdstuk1Memories } from './memories';
import { hoofdstuk1Epilogue } from './epilogue';

export const hoofdstuk1: Book = {
  id: 'hoofdstuk-1',
  number: 1,
  title: 'Hoofdstuk 1',
  subtitle: 'Het Begin',
  dateRange: '20 Nov 2025 - 14 Feb 2026',
  description: 'Van het eerste bericht tot de vraag die alles veranderde.',
  coverColor: '#F5E6E8',
  textColor: '#8B0000',
  locked: false,
  sortOrder: 1,
  pages: [hoofdstuk1Intro, ...hoofdstuk1Memories, hoofdstuk1Epilogue],
};

export { hoofdstuk1Intro, hoofdstuk1Memories, hoofdstuk1Epilogue };
