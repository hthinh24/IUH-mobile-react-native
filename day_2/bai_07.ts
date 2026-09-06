import { simulateTask } from "./bai_05.js";

// Khởi tạo 3 Promise với thời gian thực hiện lần lượt: 0.1s, 2s, 1.5s
const p1 = simulateTask(100);
const p2 = simulateTask(2000);
const p3 = simulateTask(1500);

// Dùng Promise.race để chạy song song các Promise và trả về promise thực hiện nhanh nhất, 
// thời gian chờ là thời gian của Promise nhanh nhất (100ms)
Promise.race([p1, p2, p3]).then((winner) => {
  console.log("Promise.race winner:", winner);
});
