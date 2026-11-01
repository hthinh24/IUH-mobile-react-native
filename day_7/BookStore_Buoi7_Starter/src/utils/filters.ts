import { Book } from "../types";

// Bỏ dấu tiếng Việt để "nha gia kim" vẫn tìm ra "Nhà Giả Kim"  (ĐÃ VIẾT SẴN — chỉ cần gọi)
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();

export type PriceRange = "lt100" | "100to300" | "gt300" | null;

export const PRICE_RANGES: { key: Exclude<PriceRange, null>; label: string }[] = [
  { key: "lt100", label: "Dưới 100k" },
  { key: "100to300", label: "100k–300k" },
  { key: "gt300", label: "Trên 300k" },
];

const inRange = (price: number, range: PriceRange): boolean => {
  if (range === null) return true;

  switch (range) {
    case "lt100":
      return price < 100000;
    case "100to300":
      return price >= 100000 && price <= 300000;
    case "gt300":
      return price > 300000;
  }
};

export interface BookFilter {
  keyword: string;
  categoryId: number | null;
  priceRange: PriceRange;
}

// Lọc KẾT HỢP: từ khoá (tên/tác giả) + danh mục + khoảng giá
export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const keyword = normalize(f.keyword);

  return books.filter((book) => {
    const matchesKeyword =
      keyword === "" ||
      normalize(book.title).includes(keyword) ||
      normalize(book.author).includes(keyword);

    const matchesCategory =
      f.categoryId === null || book.categoryId === f.categoryId;

    return matchesKeyword && matchesCategory && inRange(book.price, f.priceRange);
  });
}
