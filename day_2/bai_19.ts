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


async function fetchUsers(ids: number[]): Promise<User[]> {
    const userPromises = ids.map((id) => fetchUser(id));
    return await Promise.all(userPromises);
}

fetchUsers([1, 2, 3]).then((users) => console.log("Users list:", users));
