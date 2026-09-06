// Tạo interface Todo với các thuộc tính tương ứng với response shape
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Tạo một async function fetchCompletedTodos để fetch dữ liệu từ
// API "https://jsonplaceholder.typicode.com/todos" và lọc ra các todo đã hoàn thành
async function fetchCompletedTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await response.json();
  return todos.filter((todo) => todo.completed);
}

fetchCompletedTodos().then((completedList) => {
  console.log("Total completed todos:", completedList.length);
});
