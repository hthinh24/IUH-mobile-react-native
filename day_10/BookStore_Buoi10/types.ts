export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  category: string;
  inStock: boolean;
  description: string;
  cover: string;
}

export interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}
