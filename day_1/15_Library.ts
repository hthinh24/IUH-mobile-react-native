// 15. Create a Library class that can store Book and User objects. Add method to add books.

import { Book } from "./6_Book"
import { User } from "./7_User"

// Khởi tạo class Library với 2 mảng books và users
class Library {
    books: Book[]
    users: User[]

    // Phương thức thêm sách vào thư viện
    public addBook(book: Book): void {
        this.books.push(book)
    }
}