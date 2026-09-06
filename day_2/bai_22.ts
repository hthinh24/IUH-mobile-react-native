// Tạo một async function fetchTodo để fetch 2 dữ liệu todo từ một puclic
// API "https://jsonplaceholder.typicode.com/todos/{id}" và log kết quả ra console
async function fetchMultipleApi() {
  const urls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
  ];

  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Url: ${url}, data:`, data);
  }
}

fetchMultipleApi();
