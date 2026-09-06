// Định nghĩa một interface User với các thuộc tính id và name
export interface User {
  id: number;
  name: string;
}

// Tạo async function fetchUser nhận vào một id và trả về một Promise<User>
export async function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User_${id}` });
    }, 1000);
  });
}

// Tìm user với id = 999
fetchUser(999).then((user) => console.log("Fetched user:", user));
