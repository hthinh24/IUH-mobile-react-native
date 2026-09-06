// Khởi tạo một promise với kiểu trả về là string, 
// nhận vào 1 hàm callback resolve để gọi sau 2s
const helloAsync: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000);
});

// Hàm resolve truyền vào in kết quả trả về sau 2s của Promise
helloAsync.then((result) => console.log(result));