// Khởi tạo một hàm simulateTask nhận vào thời gian time (ms) và trả về một Promise<string>
// thực hiện resolve với tham số "Task done" sau time: number 
export function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

// Gọi hàm simulateTask với thời gian 1,5s và in ra kết quả trả về của Promise
simulateTask(1500).then((res) => console.log("Result:", res));
