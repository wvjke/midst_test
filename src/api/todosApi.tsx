import axios from "axios";

export interface Todo {
    id: string;
    createdAt: number;
    text: string;
    completed: boolean;
}

const todosApi = axios.create({
    baseURL: "https://64c15731fa35860baea06a3f.mockapi.io",
});

export const todosUrlEndpoint = "/todos";

export const getTodos = async (): Promise<Todo[]> => {
    const response = await todosApi.get(todosUrlEndpoint);
    return response.data;
};

export const addTodo = async ({
    text,
    completed,
}: {
    text: string;
    completed: boolean;
}) => {
    const response = await todosApi.post(todosUrlEndpoint, { text, completed });
    return response.data;
};

export const updateTodo = async (todo: Todo) => {
    // patch requests not allowed on mockapi
    const response = await todosApi.put(`${todosUrlEndpoint}/${todo.id}`, todo);
    return response.data;
};

export const deleteTodo = async (id: string) => {
    return await todosApi.delete(`${todosUrlEndpoint}/${id}`);
};
