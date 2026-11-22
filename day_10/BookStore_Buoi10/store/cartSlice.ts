import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, CartItem } from "../types";
import type { RootState } from "./index";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as CartItem[] },
  reducers: {
    addToCart(state, action: PayloadAction<Pick<Book, "id" | "title" | "price">>) {
      // TODO BT10.8a: sách đã có thì tăng quantity, chưa có thì thêm mới.
    },
    decrease(state, action: PayloadAction<string>) {
      // TODO BT10.9a: giảm quantity; nếu còn 1 thì xoá sách khỏi giỏ.
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, decrease, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (s: RootState) => s.cart.items;
// TODO BT10.8b: tính tổng số lượng bằng reduce.
export const selectCartCount = (_s: RootState): number => 0;
// TODO BT10.8b: tính tổng tiền bằng reduce.
export const selectCartTotal = (_s: RootState): number => 0;
