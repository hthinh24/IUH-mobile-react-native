// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().

// Khởi tạo class Animal với 1 thuộc tính và 1 phương thức
class Animal {
    name: string
    sound(): void {
        console.log("This animal make some sound!")
    }
}

// Khởi tạo class Dog kế thừa lại Animal
class Dog extends Animal {

    // Override lại cách tạo ra âm thanh của class Animal
    public override sound(): void {
        this.bark()
    }

    // Method riêng của class Dog
    private bark(): void {
        console.log("This animal say: Wof Wof")
    }
}

// Khởi tạo class Cat kế thừa lại Animal
class Cat extends Animal {

    // Override lại cách tạo ra âm thanh của class Animal
    public override sound(): void {
        this.meow()
    }

    // Method riêng của class Cat
    private meow(): void {
        console.log("This animal say: Meow Meow")
    }
}