import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, CartItem } from "../types";
import type { RootState } from "./index";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as CartItem[] },
  reducers: {
    addToCart(state, action: PayloadAction<Pick<Book, "id" | "title" | "price">>) {
      const book = action.payload;
      const existing = state.items.find((item) => item.bookId === book.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          bookId: book.id,
          title: book.title,
          price: book.price,
          quantity: 1,
        });
      }
    },
    decrease(state, action: PayloadAction<string>) {
      const existing = state.items.find((item) => item.bookId === action.payload);
      if (!existing) return;

      if (existing.quantity <= 1) {
        state.items = state.items.filter((item) => item.bookId !== action.payload);
      } else {
        existing.quantity -= 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.bookId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, decrease, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
