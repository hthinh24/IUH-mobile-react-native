import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
// import { EmptyState } from "../components/EmptyState";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
// import { useDebounce } from "../hooks/useDebounce";
// import { filterBooks } from "../utils/filters";
import { Book, Category } from "../types";
import { PriceRange } from "../utils/filters";
import { TabScreenProps } from "../navigation/types";
import { colors } from "../theme";
import { useCart } from "../store/hooks";

export function HomeScreen({ navigation }: TabScreenProps<"Home">) {
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

  // TODO BT7.7a: const debouncedKeyword = useDebounce(keyword, 400);
  // TODO BT7.7c: visibleBooks = useMemo(() => filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange }), [...])
  const visibleBooks = books;

  // TODO BT7.8b: nhận categoryId từ route.params (Tab Danh mục gửi sang) → setCategoryId(id) rồi navigation.setParams({ categoryId: undefined })

  // TODO BT7.7d: ListEmptyComponent = <EmptyState emoji="🔎" title="Không tìm thấy sách phù hợp" … actionLabel="Xóa bộ lọc" /> + hàm clearFilters
  // TODO BT7.7e: nút "✕ Xóa bộ lọc" (chỉ hiện khi đang có bộ lọc) trong header của lưới

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
        ListHeaderComponent={
          <View>
            <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
            <PriceFilter value={priceRange} onChange={setPriceRange} />
          </View>
        }
      />
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});
