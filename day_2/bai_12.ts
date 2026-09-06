// // Khởi tạo một async function simulateTaskAsync trả về một Promise<string>
async function simulateTaskAsync(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

// Chạy 1 async function khác gọi và in ra kết quả của simulateTaskAsync với keyword await
(async () => {
    const result = await simulateTaskAsync(2000);
    console.log("Result:", result);
})();
