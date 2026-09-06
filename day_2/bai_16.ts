// Khởi tạo một async function asyncTask nhận vào một số number và trả về một Promise<string>
export async function asyncTask2(number: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`id number: ${number}`), 500);
  });
}

// Chạy song song các asyncTask với các giá trị 1, 2, 3 và in ra kết quả trả về của Promise
async function runInParallel() {
  const results = await Promise.all([asyncTask2(1), asyncTask2(2), asyncTask2(3)]);
  console.log("Parallel results:", results);
}

runInParallel();