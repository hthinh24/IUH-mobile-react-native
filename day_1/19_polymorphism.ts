// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.

// Khởi tạo class Animal với 1 thuộc tính và 1 phương thức
class Animal2 {
    name: string
    sound(): void {
        console.log("This animal make some sound!")
    }
}

// Khởi tạo class Dog kế thừa lại Animal
class Dog2 extends Animal {

    // Override lại cách tạo ra âm thanh của class Animal
    // Đa hình cách make sound
    public override sound(): void {
        this.bark()
    }

    // Method riêng của class Dog
    private bark(): void {
        console.log("This animal say: Wof Wof")
    }
}

// Khởi tạo class Cat kế thừa lại Animal
class Cat2 extends Animal {

    // Override lại cách tạo ra âm thanh của class Animal
    // Đa hình cách make sound
    public override sound(): void {
        this.meow()
    }

    // Method riêng của class Cat
    private meow(): void {
        console.log("This animal say: Meow Meow")
    }
}