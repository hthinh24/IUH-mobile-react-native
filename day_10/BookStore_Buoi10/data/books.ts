import type { Book } from "../types";

export const BOOKS: Book[] = [];

export function loadBooks(delay = 700): Promise<Book[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...BOOKS]), delay));
}
