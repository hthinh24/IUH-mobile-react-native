import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// Component dùng chung: có onChange thì chọn sao, không có thì chỉ hiển thị.
export function RatingStars({ value, size = 18, onChange }: Props) {
  const roundedValue = Math.round(value);

  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => {
        const color = star <= roundedValue ? colors.warning : colors.line;
        const starText = (
          <Text style={[styles.star, { fontSize: size, color }]}>★</Text>
        );

        return onChange ? (
          <Pressable
            key={star}
            onPress={() => onChange(star)}
            accessibilityRole="button"
            accessibilityLabel={`${star} sao`}
            accessibilityState={{ selected: star <= roundedValue }}
            hitSlop={4}
          >
            {starText}
          </Pressable>
        ) : (
          <Text key={star} style={[styles.star, { fontSize: size, color }]}>
            ★
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  star: { fontWeight: "800", marginRight: 2 },
});
