// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.

// Khởi tạo interface Flyable với từ khóa interface
interface Flyable {
    fly(): void
}

// Khởi tạo interface Swimmable với từ khóa interface
interface Swimmable {
    swimmable(): void
}

// Khởi tạo lớp Bird implament phương thức Flyable
class Bird implements Flyable {
    fly(): void {
        console.log("I'm flying!!!")
    }
}

// Khởi tạo lớp Fish implament phương thức Swimmable
class Fish implements Swimmable {
    swimmable(): void {
        console.log("I'm swimming!!!")
    }
}