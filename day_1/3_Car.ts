// 3. Create a class Car with properties brand, model, year. Write a method to show car info.

// Khởi tạo class Car với từ khóa class với 3 thuộc tính
class Car {
    brand: string;
    model: string ;
    year: number;

    // Method show thông tin 3 thuộc tính của Car qua console.log
    public getCarInfo(): void {
        console.log("Car info: brand: " + this.brand + ", model: " + this.model + ", year: " + this.year)
    } 
}