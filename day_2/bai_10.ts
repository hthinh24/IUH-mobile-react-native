// Khởi tạo một hàm successPromise với kiểu trả về là string
// nhận vào 1 hàm callback resolve để gọi sau 1s và trả về giá trị "success"
const successPromise = new Promise<string>((resolve) => {
  setTimeout(() => resolve("success"), 1000);
});

// Gọi hàm successPromise và sử dụng finally để in ra "Done" sau khi Promise 
// được resolve hoặc reject
successPromise
  .then((res) => console.log("Data:", res))
  .catch((err) => console.error(err))
  .finally(() => {
    console.log("Done");
  });
