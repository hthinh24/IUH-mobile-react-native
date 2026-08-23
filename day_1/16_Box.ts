// 16. Create a generic class Box that can store any type of value.

import { Book } from "./6_Book"

// Khởi tạo class Box với thuộc tính generic
class Box<T> {
    value: T 

    constructor(value: T) {
        this.value = value;
    }
}

const book: Book = {title: "test", author: "author", year: 1999}
const boxContainBook = new Box<Book>(book) 