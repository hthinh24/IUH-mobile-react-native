import { createSlice } from "@reduxjs/toolkit";
import type { Book } from "../types";
import type { RootState } from "./index";

// Reserved for optional exercise 10.11 (json-server bonus).
type Status = "idle" | "loading" | "succeeded" | "failed";

const booksSlice = createSlice({
  name: "books",
  initialState: { items: [] as Book[], status: "idle" as Status, error: null as string | null },
  reducers: {},
});

export default booksSlice.reducer;
export const selectBooksState = (state: RootState) => state.books;
