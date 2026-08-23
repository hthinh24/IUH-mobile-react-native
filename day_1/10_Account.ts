// 10. Create a class Account with public, private and readonly fields.

// Khởi tạo class Account với các thuộc tính public, private, readonly
class Account {
    private readonly id: string;    // Thuộc tính id được private và không cho phép đổi với readonly
    public name: string             // Thuộc tính name được công khai với public
    private amount: number          // Thuộc tính amount được che dấu với private
}