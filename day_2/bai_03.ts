// Khởi tạo một promise với kiểu trả về là void, 
// tự động reject sau 1s với lỗi: "Something went wrong"
function rejectWithError(): Promise<void> {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}

// Catch lỗi từ Promise và in ra thông báo
rejectWithError().catch((err) =>
    console.error("Caught expected error:", err.message),
);