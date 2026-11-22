import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { loadBooks } from "../data/books";
import type { Book } from "../types";
import { colors } from "../theme";

export function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [isTile, setIsTile] = useState(false); // Switch "Dạng lưới"

  // TODO BT10.11c (Bonus, không bắt buộc): đọc từ API khi USE_API = true
  //   - import { USE_API } từ "../config"; import { fetchBooks, selectBooksState } từ "../store/booksSlice"
  //   - dispatch(fetchBooks()) trong useEffect khi USE_API bật; nguồn dữ liệu là state.books.items
  //   - đặt sourceBooks = (đang đọc mảng) ? books : api.items; categories và visible đều dùng sourceBooks
  //   - status "loading" hiện ActivityIndicator; status "failed" hiện thông báo lỗi, nút "Thử lại" (dispatch lại)
  //     và nút "Dùng dữ liệu mảng" (quay về đọc mảng); kéo để làm mới cũng dispatch(fetchBooks())
  // Lần đầu: tải mảng (có độ trễ giả lập) rồi tắt trạng thái loading
  useEffect(() => {
    loadBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  // TODO BT10.5b: kéo để làm mới
  //   setRefreshing(true) -> setBooks(await loadBooks()) -> setRefreshing(false)
  const onRefresh = useCallback(async () => {}, []);

  const categories = useMemo(() => Array.from(new Set(books.map((b) => b.category))), [books]);

  // TODO BT10.6: lọc theo category (null là tất cả) và theo keyword (so khớp tên hoặc tác giả,
  //   dùng normalize() để bỏ dấu); bọc trong useMemo với [books, keyword, category]
  const visible = books;

  const onSelect = useCallback((id: string) => {
    // TODO BT10.7d: navigation.navigate("Detail", { id })
    console.log("Chọn sách", id);
  }, []);

  // TODO BT10.5a: numColumns = isTile ? 2 : 1
  const numColumns = 1;

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 BookStore</Text>
        <TextInput
          style={styles.search}
          placeholder="Tìm theo tên sách hoặc tác giả…"
          placeholderTextColor="#9AA3B8"
          value={keyword}
          onChangeText={setKeyword}
        />
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} testID="grid-switch" />
        </View>
      </View>

      <View style={styles.chips}>
        {[null, ...categories].map((c) => (
          <TouchableOpacity
            key={c ?? "all"}
            style={[styles.chip, category === c && styles.chipOn]}
            onPress={() => setCategory(c)}
            testID={`chip-${c ?? "all"}`}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextOn]}>{c ?? "Tất cả"}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.indigo} />
          <Text style={styles.empty}>Đang tải sách…</Text>
        </View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(b) => b.id}
          renderItem={({ item }) => (
            <View style={styles.bookRow}>
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookRating}>⭐ {item.rating.toFixed(1)}</Text>
              </View>
              <Text style={[styles.stock, item.inStock ? styles.inStock : styles.outOfStock]}>
                {item.inStock ? "✅" : "❌"}
              </Text>
            </View>
          )}
          contentContainerStyle={{ padding: 14, paddingBottom: 30 }}
          ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy sách phù hợp.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, paddingHorizontal: 14, paddingBottom: 12, paddingTop: 6, gap: 8 },
  title: { color: "#fff", fontSize: 22, fontWeight: "800" },
  search: { backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 },
  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 },
  switchLabel: { color: "#D5DDF7", fontWeight: "600" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 14, paddingTop: 10 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  chipOn: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { color: colors.text, fontWeight: "600", fontSize: 13 },
  chipTextOn: { color: "#fff" },
  columnWrapper: { justifyContent: "space-between" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  empty: { textAlign: "center", color: colors.muted, marginTop: 30 },
  bookRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: colors.line },
  bookInfo: { flex: 1, gap: 4 },
  bookTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
  bookRating: { fontSize: 13, color: colors.muted },
  stock: { fontSize: 16, fontWeight: "800" },
  inStock: { color: colors.green },
  outOfStock: { color: colors.red },
});
