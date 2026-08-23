// 7. Write a class User with private property name and getter/setter.

// Khởi tạo class User với từ khóa class với 1 private attribute 
export class User {
    private name: string

    // Method getter lấy tên user
    public getName(): string {
        return this.name;
    }

    // Method setter cập nhật tên user
    public setName(): string {
        return this.name;
    }
}

