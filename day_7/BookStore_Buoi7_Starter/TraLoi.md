# Trả lời câu hỏi bổ sung – Thực hành React Native Buổi 7

## 1. Cấu trúc điều hướng

`BookDetail` được đăng ký ở Native Stack vì đây là màn hình chi tiết được mở từ một màn hình đang nằm trong Tab Navigator; khi mở, nó được đẩy lên trên và che Tab Bar, đồng thời có nút quay lại của Stack. Nếu đặt `BookDetail` trực tiếp trong Tab thì nó trở thành một tab độc lập, Tab Bar vẫn hiển thị và người dùng chuyển tab thay vì đi theo luồng mở/đóng màn hình chi tiết.

## 2. Redux

Redux Toolkit dùng Immer nên `state` trong reducer là một draft (bản nháp) được theo dõi, không phải state gốc; các thao tác như `state.items.push(...)` được Immer ghi nhận rồi tạo ra state mới bất biến sau khi reducer kết thúc. Bỏ `useMemo` thì tổng số lượng và tổng tiền vẫn chính xác, nhưng phép `reduce` sẽ chạy lại ở mỗi lần component render thay vì chỉ khi `items` thay đổi, gây tính toán thừa khi giỏ hàng lớn.

## 3. Promise.all

Với code hiện tại, `Promise.all` bị reject khi một trong hai request lỗi; khối `catch` hiển thị `ErrorView` nên danh sách sách dù tải thành công cũng không được render. Có thể chuyển sang `Promise.allSettled` rồi kiểm tra riêng `status` của từng kết quả để cập nhật sách nếu `getBooks()` thành công và danh mục nếu `getCategories()` thành công. Đổi lại, phải tự xử lý lỗi và trạng thái tải riêng cho từng phần dữ liệu, đồng thời giao diện có thể chỉ hiển thị được một phần nội dung.

## 4. Debounce

Đặt `setTimeout` trực tiếp trong `onChangeText` sẽ tạo một timer mới sau mỗi phím gõ; nếu không huỷ các timer cũ thì nhiều lần lọc vẫn lần lượt chạy, chỉ bị trì hoãn chứ không được gộp thành một lần. Cleanup `clearTimeout` huỷ timer trước khi effect chạy lại hoặc component unmount, nhờ đó chỉ áp dụng giá trị sau lần gõ cuối và tránh cập nhật state từ timer cũ khi màn hình đã bị gỡ.

## 5. Sắp xếp giá tăng dần / giảm dần

Thêm state `sortOrder` với ba trạng thái: `null` (không sắp xếp), `asc` (tăng dần) và `desc` (giảm dần). Trong `visibleBooks`, lọc trước rồi sắp xếp một bản sao bằng `[...]` để không mutate mảng sách gốc:

```tsx
const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, {
    keyword: debouncedKeyword,
    categoryId,
    priceRange,
  });

  if (sortOrder === null) return filtered;

  return [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );
}, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
```

Trên Home, hai nút “Giá tăng dần” và “Giá giảm dần” cập nhật `sortOrder` tương ứng; bấm lại nút đang chọn sẽ đưa state về `null`.

## Thử thách C1 — Vì sao giao diện không phụ thuộc Redux?

Màn hình `BookDetail` chỉ gọi `useWishlist()`, không trực tiếp đọc state hay dispatch action của Redux; hook này đóng vai trò adapter che giấu cách quản lý state. Nếu chuyển sang Zustand hoặc thư viện khác, chỉ cần thay phần triển khai `useWishlist()` trong `hooks.ts` và giữ nguyên giao diện hook, nên component không phải sửa.
