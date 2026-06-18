import { Book } from '../../types';
import { hoofdstuk1 } from './hoofdstuk-1';
import { hoofdstuk2 } from './hoofdstuk-2';

export const books: Book[] = [hoofdstuk1, hoofdstuk2].sort(
  (a, b) => a.sortOrder - b.sortOrder
);

export const getAllBooks = (): Book[] => books;

export const getBookById = (bookId: string): Book | undefined =>
  books.find((book) => book.id === bookId);

export const flattenBookPages = (book: Book) => book.pages;

export { hoofdstuk1, hoofdstuk2 };
