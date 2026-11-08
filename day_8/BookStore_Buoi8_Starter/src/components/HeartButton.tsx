import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useWishlist } from "../store/hooks";
import { colors } from "../theme";

interface Props {
  bookId: number;
  size?: number;
  style?: ViewStyle;
}

// Nút tim dùng chung Redux wishlist, đồng bộ ở Home, Chi tiết và màn Yêu thích.
export function HeartButton({ bookId, size = 34, style }: Props) {
  const { isFavorite, toggle } = useWishlist();
  const favorite = isFavorite(bookId);

  return (
    <Pressable
      style={[styles.btn, { width: size, height: size, borderRadius: size / 2 }, style]}
      onPress={() => toggle(bookId)}
      accessibilityRole="button"
      accessibilityLabel={favorite ? "Bỏ yêu thích" : "Yêu thích"}
      accessibilityState={{ selected: favorite }}
      hitSlop={4}
    >
      <Text style={{ fontSize: size * 0.55, color: favorite ? colors.heart : colors.muted }}>
        {favorite ? "♥" : "♡"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { position: "absolute", top: 8, right: 8, backgroundColor: "rgba(255,255,255,0.92)", alignItems: "center", justifyContent: "center", zIndex: 2 },
});
