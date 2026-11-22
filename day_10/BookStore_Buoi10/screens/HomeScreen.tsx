import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BOOKS } from "../data/books";
import { colors } from "../theme";

export function HomeScreen() {
  const [keyword, setKeyword] = useState("");
  const [isTile, setIsTile] = useState(false);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 BookStore</Text>
        <TextInput
          style={styles.search}
          placeholder="Tìm sách..."
          placeholderTextColor={colors.muted}
          value={keyword}
          onChangeText={setKeyword}
        />
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.bookList}>
        {BOOKS.map((book) => (
          <View key={book.id} style={styles.bookRow}>
            <Text style={styles.bookTitle}>{book.title}</Text>
          </View>
        ))}
      </ScrollView>
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
  bookList: { gap: 10, padding: 14 },
  bookRow: { minHeight: 52, justifyContent: "center", paddingHorizontal: 14, borderRadius: 10, backgroundColor: "#fff" },
  bookTitle: { color: colors.text, fontSize: 15, fontWeight: "500" },
});
