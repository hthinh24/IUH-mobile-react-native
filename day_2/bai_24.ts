// Tạo một async function postData để gửi dữ liệu đến API 
// "https://jsonplaceholder.typicode.com/posts" bằng phương thức POST
//  và log kết quả trả về
async function postData(payload: any): Promise<void> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  console.log("POST Result:", result);
}

const payload = {
  title: "test title",
  body: "test body",
  userId: 999,
};
postData(payload);
