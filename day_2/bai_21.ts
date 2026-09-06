// Tạo một async function fetchTodo để fetch dữ liệu từ một puclic
// API "https://jsonplaceholder.typicode.com/todos/1" và log kết quả ra console
async function fetchTodo() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    const data = await response.json();
    console.log("Fetched todo:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

fetchTodo();