import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] as string[] },
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const index = state.ids.indexOf(action.payload);
      if (index >= 0) {
        state.ids.splice(index, 1);
      } else {
        state.ids.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectIsFavorite = (id: string) => (state: RootState) =>
  state.favorites.ids.includes(id);
