// Khởi tạo một async function multiplyByThree nhận vào một số x và trả về một Promise<number>
// sau 1s thực hiện resolve với giá trị x * 3
async function multiplyByThree(x: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 3);
    }, 1000);
  });
}

(async () => {
  // Gọi hàm multiplyByThree với giá trị 5 và in ra kết quả trả về của Promise
  const result = await multiplyByThree(5);
  console.log("Result:", result);
})();