// Khởi tạo một promise với kiểu trả về là number có tỉ lệ thành công 50% và thất bại 50%, 
const randomNumPromise = new Promise<number>((resolve, reject) => {
    const num = Math.random();
    if (num > 0.5) {
        resolve(num);
    } else {
        reject(new Error("Failed to generate random number"));
    }
});

// Hàm test in ra kết quả trả về của Promise hoặc lỗi nếu Promise bị reject
randomNumPromise
    .then((num) => console.log("Random number:", num))
    .catch((err) => console.error("Error:", err.message));