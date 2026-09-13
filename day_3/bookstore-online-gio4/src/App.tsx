import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
    const [cartCount, setCartCount] = useState(0);
    return (
        <View style={styles.screen}>
            {/* 1. Header cố định trên cùng */}
            <Header />
            {/* 2. ScrollView chứa Chips + Grid — nhớ paddingBottom đủ lớn để
FloatingCartButton không che mất sách cuối cùng */}
            <ScrollView contentContainerStyle={styles.content}>
                <CategoryChips />
                <BookGrid books={BOOKS} onPressBook={(book) => setCartCount(cartCount + 1)} />
            </ScrollView>
            {/* 3. Nút giỏ nổi — NGOÀI ScrollView */}
            <FloatingCartButton count={cartCount} onPress={() => alert('Go to cart')} />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#F8FAFC' },
    content: { padding: 16, paddingBottom: 100 },
});