// 14. Create a base class Employee. Extend Manager and Developer with specific methods.

// Khởi tạo class Car với từ khóa class với 2 thuộc tính
class Employee {
    private readonly id: string;
    public name: string
}

// Khởi tạo class Manager kế thừa Employee
class Manager extends Employee {
    
    // Method lập kế hoạch cho team
    public makePlan(): void {
        console.log("He planinng somethinggggggg")
    }
}

// Khởi tạo class Developer kế thừa Employee
class Developer extends Employee {
    
    // Method vibe code nhưng không review của Developer
    public blindVibeCodingWithouReview(): void {
        console.log("Oh no, he vibe coding bindly!")
    }
}