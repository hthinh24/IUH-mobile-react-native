// Khởi tạo một hàm filterEvenNumbers nhận vào mảng numbers và trả về một mảng các 
// số chẵn trong mảng đó sử dụng Promise để thực hiện lọc sau 1s
function filterEvenNumbers(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(arr.filter((num) => num % 2 === 0));
    }, 1000);
  });
}

// Gọi hàm filterEvenNumbers với mảng [1, 2, 3, 4, 5, 6] 
// và mong chờ kết quả là mảng [2, 4, 6] sau 1s
filterEvenNumbers([1, 2, 3, 4, 5, 6]).then((evens) => {
  console.log("Filtered evens:", evens);
});
