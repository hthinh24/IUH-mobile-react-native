import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme";

const BOOK_TITLES = [
  "Clean Code",
  "Atomic Habits",
  "React Native in Action",
  "Nhà Giả Kim",
  "Đắc Nhân Tâm",
];

export function HomeScreen() {
  const [keyword, setKeyword] = useState("");
  const [isTile, setIsTile] = useState(false);

  const visibleTitles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase();
    if (!normalizedKeyword) return BOOK_TITLES;

    return BOOK_TITLES.filter((title) =>
      title.toLocaleLowerCase().includes(normalizedKeyword),
    );
  }, [keyword]);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 BookStore</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder="Tìm sách..."
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
          accessibilityLabel="Tìm kiếm sách"
        />

        <View style={styles.displayOption}>
          <Text style={styles.displayOptionText}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>

        <ScrollView contentContainerStyle={styles.bookList}>
          {visibleTitles.map((title) => (
            <View key={title} style={styles.bookRow}>
              <Text style={styles.bookTitle}>{title}</Text>
            </View>
          ))}
          {visibleTitles.length === 0 && (
            <Text style={styles.emptyText}>Không tìm thấy sách phù hợp.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    minHeight: 64,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.navy,
  },
  headerTitle: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    minHeight: 46,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 15,
  },
  displayOption: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 8,
  },
  displayOptionText: {
    color: colors.text,
    fontSize: 14,
  },
  bookList: {
    gap: 10,
    paddingTop: 8,
    paddingBottom: 24,
  },
  bookRow: {
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  bookTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
  },
  emptyText: {
    paddingVertical: 24,
    color: colors.muted,
    textAlign: "center",
  },
});
