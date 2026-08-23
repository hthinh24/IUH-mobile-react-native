// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.

// Khởi tạo class Rectangle với từ khóa class với 2 thuộc tính
class Rectangle {
    width: number;
    height: number;

    // Method tính chu vi hình vuông
    public calPerimeter(): number {
        return (this.width + this.height) * 2;
    } 

    // Method tính diện tích hình vuông
    public calArea(): number {
        return this.width * this.height;
    } 
}