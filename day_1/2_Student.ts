// 2. Write a class Student extending Person with an additional attribute grade. Add a method to
// display all info.

import { Person } from "./1_Person";

// Khởi tạo class Student kế thừa thuộc tính Person với từ khóa "extends"
class Student extends Person {
    grade: number;  // Attributes riêng của Student
}