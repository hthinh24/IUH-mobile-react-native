// Khởi tạo một promise với kiểu trả về là number, 
// nhận vào 1 hàm callback resolve để gọi sau 1s và trả về giá trị 10
function getNumberTen(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

// Hàm resolve truyền vào in kết quả trả về sau 1s của Promise
getNumberTen().then((val) => console.log("Result:", val));
