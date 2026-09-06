// Khởi tạo một async function iteratePromises nhận vào một mảng các Promise<string>
// và in ra từng giá trị trả về của Promise theo thứ tự
async function iteratePromises(promises: Promise<string>[]): Promise<void> {
  for await (const result of promises) {
    console.log("Iterated item:", result);
  }
}

const promisesList = [
  Promise.resolve("Item 1"),
  new Promise<string>((res) => setTimeout(() => res("Item 2"), 500)),
  new Promise<string>((res) => setTimeout(() => res("Item 3"), 1000)),
];
iteratePromises(promisesList);
