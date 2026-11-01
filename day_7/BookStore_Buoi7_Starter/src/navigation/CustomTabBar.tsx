
import React from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar, type TabItem } from "../components/TabBar";
import { useCart } from "../store/hooks";

// Ánh xạ tên màn hình với emoji tương ứng
const EMOJI: Record<string, string> = {
  Home: "🏠",
  Categories: "🗂️",
  Cart: "🛒",
  Account: "👤",
};

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { totalQuantity } = useCart();

  // A. Chuyển routes thành danh sách items cho TabBar
  const items: TabItem[] = state.routes.map((route) => ({
    key: route.key,
    label: descriptors[route.key].options.title ?? route.name,
    emoji: EMOJI[route.name] ?? "•",
    badge: route.name === "Cart" ? totalQuantity : undefined,
  }));

  // B. Xử lý khi người dùng nhấn một tab
  const onPress = (key: string) => {
    const route = state.routes.find((r) => r.key === key);

    if (!route) return;

    const isFocused = state.routes[state.index].key === key;

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  // C. Vẽ TabBar
  return (
    <TabBar
      items={items}
      activeKey={state.routes[state.index].key}
      onPress={onPress}
    />
  );
}
