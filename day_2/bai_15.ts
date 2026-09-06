// Khởi tạo một async function asyncTask nhận vào một số number và trả về một Promise<string>
export async function asyncTask(number: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`id number: ${number}`), 500);
  });
}

// Chạy tuần tự các asyncTask với các giá trị 1, 2, 3 và in ra kết quả trả về của Promise
async function runSequentially() {
  const res1 = await asyncTask(1);
  console.log(res1);
  const res2 = await asyncTask(2);
  console.log(res2);
  const res3 = await asyncTask(3);
  console.log(res3);
}

runSequentially();
