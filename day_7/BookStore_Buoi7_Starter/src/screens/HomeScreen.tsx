import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { EmptyState } from "../components/EmptyState";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks } from "../utils/filters";
import { Book, Category } from "../types";
import { PriceRange } from "../utils/filters";
import { TabScreenProps } from "../navigation/types";
import { colors } from "../theme";
import { useCart } from "../store/hooks";

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [bookData, categoryData] = await Promise.all([
        getBooks(),
        getCategories(),
      ]);
      setBooks(bookData);
      setCategories(categoryData);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const debouncedKeyword = useDebounce(keyword, 400);
  const visibleBooks = useMemo(() => {
    const filteredBooks = filterBooks(books, {
      keyword: debouncedKeyword,
      categoryId,
      priceRange,
    });

    if (sortOrder === null) return filteredBooks;

    return [...filteredBooks].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);

  const hasFilter =
    keyword !== "" ||
    categoryId !== null ||
    priceRange !== null ||
    sortOrder !== null;

  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
    setSortOrder(null);
  };

  useEffect(() => {
    const id = route.params?.categoryId;

    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  if (loading) {
    return <LoadingView label="Đang tải sách…" />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={() => void load()} />;
  }

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}
      <BookGrid
        data={visibleBooks}
        onPressBook={(book) =>
          navigation.navigate("BookDetail", { bookId: book.id })
        }
        ListEmptyComponent={
          <EmptyState
            emoji="🔎"
            title="Không tìm thấy sách phù hợp"
            message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
            actionLabel="Xóa bộ lọc"
            onAction={clearFilters}
          />
        }
        ListHeaderComponent={
          <View>
            <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
            <PriceFilter value={priceRange} onChange={setPriceRange} />
            <View style={styles.sortRow}>
              <Text style={styles.sortLabel}>Sắp xếp giá:</Text>
              <Pressable
                style={[styles.sortChip, sortOrder === "asc" && styles.sortChipActive]}
                onPress={() => setSortOrder((current) => current === "asc" ? null : "asc")}
              >
                <Text style={[styles.sortChipText, sortOrder === "asc" && styles.sortChipTextActive]}>
                  Giá tăng dần ↑
                </Text>
              </Pressable>
              <Pressable
                style={[styles.sortChip, sortOrder === "desc" && styles.sortChipActive]}
                onPress={() => setSortOrder((current) => current === "desc" ? null : "desc")}
              >
                <Text style={[styles.sortChipText, sortOrder === "desc" && styles.sortChipTextActive]}>
                  Giá giảm dần ↓
                </Text>
              </Pressable>
            </View>
            {hasFilter && (
              <Pressable
                onPress={clearFilters}
                style={{ alignSelf: "flex-end", paddingHorizontal: 12, paddingVertical: 6 }}
              >
                <Text style={{ color: colors.indigo, fontWeight: "700" }}>
                  ✕ Xóa bộ lọc
                </Text>
              </Pressable>
            )}
          </View>
        }
      />
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 8,
  },
  sortLabel: { color: colors.muted, fontWeight: "600" },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
  },
  sortChipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  sortChipText: { color: colors.text, fontWeight: "600" },
  sortChipTextActive: { color: "#fff" },
});
