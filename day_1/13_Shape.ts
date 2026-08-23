// 13. Create an abstract class Shape with method area(). Implement Square and Circle.

// Khởi tạo abstract class Shape với các phương thức area chưa được implement
abstract class Shape {
    abstract area(): void
}

// Khởi tạo class Square kế thừa abtract class Shape
class Square extends Shape {
    width: number;

    // Implement phương thức Area của Shape
    public area(): number {
        return this.width * 2
    }
}


// Khởi tạo class Circle kế thừa abtract class Shape
class Circle extends Shape {
    r: number;

    // Implement phương thức Area của Shape
    public area(): number {
        return 3.14 * this.r * this.r
    }
}