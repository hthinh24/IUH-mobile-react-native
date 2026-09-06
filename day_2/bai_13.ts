// Khởi tạo một async function failingTask trả về một Promise<void> 
// bị reject với lỗi task failed sau 1s
function failingTask(): Promise<void> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Task failed")), 1000);
  });
}

// Hàm async function handleAsyncError sử dụng try/catch để bắt lỗi từ failingTask và xử lý
async function handleAsyncError() {
  try {
    await failingTask();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
  }
}
handleAsyncError();
