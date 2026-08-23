// 20. Write a Vehicle interface and implement it in Car and Bike classes.

// Khởi tạo interface Vehicle 1 phương thức
interface Vehicle {
    drive(): void
}

// Khởi tạo class Car2 implement Vehicle interfaces
class Car2 implements Vehicle {
    drive(): void {
        console.log("Drive with car style")
    }
}

// Khởi tạo class Bike2 implement Vehicle interfaces
class Bike2 implements Vehicle {
    drive(): void {
        console.log("Drive with bike style")
    }
}