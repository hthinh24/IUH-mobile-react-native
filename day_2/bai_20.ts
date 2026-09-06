// Tạo một async function fetchWithTimeout nhận vào một Promise và 
// trả về kết quả của Promise đó nếu nó hoàn thành trong vòng 2 giây, 
// nếu không thì ném ra lỗi "Request timed out"
async function fetchWithTimeout<T>(apiCall: Promise<T>): Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 2000);
    });

    return Promise.race([apiCall, timeout]);
}

// Tạo một Promise giả lập một API call chậm trả về Data sau 3s
const slowTask = new Promise<string>((res) => setTimeout(() => res("Data"), 3000));

fetchWithTimeout(slowTask)
    .then((data) => console.log("Fetched data:", data))
    .catch((err) => console.error("Timeout Error:", err.message));