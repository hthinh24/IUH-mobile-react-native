import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BOOKS, loadBooks } from "../data/books";
import type { Book } from "../types";
import { colors } from "../theme";

export function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [isTile, setIsTile] = useState(false);

  // Load the local sample array once. The 700ms delay makes the loading state visible.
  useEffect(() => {
    let isMounted = true;

    loadBooks().then((data) => {
      if (!isMounted) return;
      setBooks(data);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Keep the existing search field usable; accent-insensitive search is added in exercise 10.6.
  const visibleBooks = useMemo(() => {
    const query = keyword.trim().toLocaleLowerCase();
    if (!query) return books;

    return books.filter((book) =>
      book.title.toLocaleLowerCase().includes(query),
    );
  }, [books, keyword]);

  const renderBook = ({ item }: { item: Book }) => (
    <View style={styles.bookRow}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookRating}>⭐ {item.rating.toFixed(1)}/10</Text>
      </View>
      <Text
        style={[
          styles.stockStatus,
          item.inStock ? styles.inStock : styles.outOfStock,
        ]}
      >
        {item.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}
      </Text>
    </View>
  );

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
          <Switch
            value={isTile}
            onValueChange={setIsTile}
            accessibilityLabel="Dạng lưới"
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.indigo} />
            <Text style={styles.loadingText}>Đang tải sách…</Text>
          </View>
        ) : (
          <FlatList
            data={visibleBooks}
            keyExtractor={(book) => book.id}
            renderItem={renderBook}
            contentContainerStyle={styles.bookList}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Không tìm thấy sách phù hợp.</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        )}
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
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bookInfo: {
    flex: 1,
    gap: 5,
  },
  bookTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  bookRating: {
    color: colors.muted,
    fontSize: 13,
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: "600",
  },
  inStock: {
    color: "#16803C",
  },
  outOfStock: {
    color: "#C0392B",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    color: colors.muted,
    fontSize: 14,
  },
  emptyText: {
    paddingVertical: 24,
    color: colors.muted,
    textAlign: "center",
  },
});
