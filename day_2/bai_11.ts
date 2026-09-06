// Khởi tạo một async function getHelloAsync trả về một Promise<string>
async function HelloAsync(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}

// Execute 1 hàm async function gọi HelloAsync với keyword await 
// để lấy kết quả trả về của Promise và in ra console
(async () => {
  const result = await HelloAsync();
  console.log("Result:", result);
})();
