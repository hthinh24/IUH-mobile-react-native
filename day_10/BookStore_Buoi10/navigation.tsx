import React from "react";

// TODO BT10.7: Implement Native Stack and Bottom Tabs navigation.
export type RootStackParamList = {
  Tabs: undefined;
  Detail: { id: string };
};

export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Favorites: undefined;
};

export function RootNavigator() {
  return null;
}
