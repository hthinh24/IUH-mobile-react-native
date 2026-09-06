// Tạo chain of promise với các steps:
Promise.resolve(2)
  .then((num) => num * num)       // Bình phương
  .then((squared) => squared * 2) // Nhân đôi
  .then((doubled) => doubled + 5) // Cộng thêm 5
  .then((result) => console.log("Final chain result:", result)); // In ra kết quả cuối cùng
