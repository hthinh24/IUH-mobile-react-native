import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BOOKS } from "../data/books";
import { colors } from "../theme";

export function FavoritesScreen() {
  // TODO BT10.10c: chỉ hiển thị các sách có id nằm trong danh sách yêu thích.
  const favorites = BOOKS;
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}><Text style={styles.title}>♥ Yêu thích</Text></View>
      <FlatList
        data={favorites}
        keyExtractor={(book) => book.id}
        contentContainerStyle={{ padding: 14, flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có sách yêu thích.</Text>}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, padding: 14 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  empty: { textAlign: "center", color: colors.muted, marginTop: 40 },
});
