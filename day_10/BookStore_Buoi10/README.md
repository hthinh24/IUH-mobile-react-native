# BookStore – Buổi 10

Expo + React Native + TypeScript project for the React Native practice.

## Run locally

Requires Node.js 22.13+ for Expo SDK 58.

```powershell
cd day_10/BookStore_Buoi10
npm install
npx expo start
```

Press `w` to open the web preview, or scan the QR code with Expo Go.

## Expo Snack preview

See [SNACK_URL.md](./SNACK_URL.md) for the fixed Snack URL. It loads the project files from the public GitHub branch `feat/day-10-bookstore`; reload the same URL after new commits to fetch the latest source.

## Dependencies

The current milestone uses:

- `expo`
- `react-native-safe-area-context`

React Navigation and Redux Toolkit will be introduced in their corresponding exercises to keep each milestone small and easy to verify.

## Progress

- [x] 10.1 – Source implemented: SafeAreaProvider, SafeAreaView root for Home, navy BookStore header (runtime verification pending)
- [x] 10.2 – Source implemented: 10-book local dataset, FlatList, unique keyExtractor, 700ms ActivityIndicator loading state (runtime verification pending)
- [ ] 10.3 – BookCard
- [ ] 10.4 – Row/tile layouts
- [ ] 10.5 – Grid switch and refresh
- [ ] 10.6 – Search and category filters
- [ ] 10.7 – React Navigation
- [ ] 10.8 – Redux store and cart slice
- [ ] 10.9 – Cart interactions and badge
- [ ] 10.10 – Favorites
- [ ] 10.11 – Optional json-server bonus

Source implementation is committed to GitHub. Runtime verification and screenshots are performed manually in Expo Snack.
