// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().

// Khởi tạo class BankAccount với từ khóa class với 1 attribute
class BankAccount {
    balance: number;    // Thuộc tính số dư tài khoản

    // Method nạp <amount> vào tài khoản
    public deposit(amount: number) {
        this.balance += amount;
    } 

    // Method rút <amount> ra khỏi tài khoản
    public withdraw(amount: number): void {
        this.balance -= amount;
    }

    // Method lấy số dư tài khoản
    public getBalance(): number {
        return this.balance;
    }
}