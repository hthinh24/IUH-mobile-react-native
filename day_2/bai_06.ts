import { simulateTask } from "./bai_05.js";

// Khởi tạo 3 Promise với thời gian thực hiện lần lượt: 1s, 2s, 1.5s
const p1 = simulateTask(1000);
const p2 = simulateTask(2000);
const p3 = simulateTask(1500);

// Dùng Promise.all để chạy song song các Promise, thời gian chờ là thời gian
// của Promise lâu nhất (2000ms)
Promise.all([p1, p2, p3]).then((results) => {
    console.log("Promise.all results:", results);
});
