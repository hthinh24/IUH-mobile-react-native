import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  // State cục bộ giúp số lượng phản hồi ngay khi người dùng bấm.
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  // Chỉ cập nhật Redux sau khi người dùng ngừng thay đổi số lượng 300ms.
  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onChangeQty(item.bookId, debouncedQty);
    }
  }, [debouncedQty, item.bookId, item.quantity, onChangeQty]);

  // Đồng bộ nếu số lượng bị thay đổi từ nơi khác trong store.
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  const decrease = () => {
    setQty((current) => Math.max(1, current - 1));
  };

  const increase = () => {
    setQty((current) => Math.min(item.stock, current + 1));
  };

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Text style={styles.stock}>Còn {item.stock}</Text>
      </View>

      <View style={styles.quantitySection}>
        <View style={styles.quantityControl}>
          <Pressable
            onPress={decrease}
            disabled={!canDec}
            style={[styles.quantityButton, !canDec && styles.quantityButtonDisabled]}
            accessibilityRole="button"
            accessibilityLabel="Giảm số lượng"
            accessibilityState={{ disabled: !canDec }}
            hitSlop={4}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </Pressable>

          <Text style={styles.qty}>{qty}</Text>

          <Pressable
            onPress={increase}
            disabled={!canInc}
            style={[styles.quantityButton, !canInc && styles.quantityButtonDisabled]}
            accessibilityRole="button"
            accessibilityLabel="Tăng số lượng"
            accessibilityState={{ disabled: !canInc }}
            hitSlop={4}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => onRemove(item.bookId)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Xóa khỏi giỏ"
      >
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 3 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  stock: { color: colors.muted, fontSize: 11 },
  quantitySection: { alignItems: "center" },
  quantityControl: { flexDirection: "row", alignItems: "center", gap: 5 },
  quantityButton: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#EEF2FF", alignItems: "center", justifyContent: "center" },
  quantityButtonDisabled: { opacity: 0.35 },
  quantityButtonText: { color: colors.indigo, fontSize: 18, fontWeight: "800", lineHeight: 22 },
  qty: { minWidth: 18, textAlign: "center", fontWeight: "800", color: colors.navy, fontSize: 15 },
  trash: { fontSize: 22 },
});
