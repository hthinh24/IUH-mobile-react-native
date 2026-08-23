// 18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().

// Khởi tạo class MathUtil với các phương thức hỗ trợ
class MathUtil {

    // Method cộng 2 số
    public static add(a: number, b: number): number {
        return a + b
    }
    
    // Method lấy a - b
    public static subtract(a: number, b: number): number {
        return a - b
    }

    // Method nhân a và b
    public static multiply(a: number, b: number): number {
        return a * b
    }

    // Method lấy a chia b
    public static divide(a: number, b: number): number {
        return a / b
    }
}

console.log("1 + 2 = " + MathUtil.add(1, 2))