import { TodoInput, AddTodoWrapper, TodoButton } from "./AddTodo.styled";
import {
    getTodos,
    addTodo,
    todosUrlEndpoint as cacheKey,
} from "../../api/todosApi";
import useSWR from "swr";
import { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const AddTodo = () => {
    const { mutate } = useSWR(cacheKey, getTodos);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addTodo({
                text: inputRef.current
                    ? inputRef.current.value
                    : "nothing here",
                completed: false,
            });
            toast.success("Todo added successfully");
            mutate();
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <AddTodoWrapper>
                <form
                    onSubmit={handleAddTodo}
                    style={{ display: "flex", width: "100%", gap: "20px" }}
                >
                    <TodoInput required ref={inputRef} />
                    <TodoButton color="#007bff">Add Todo</TodoButton>
                </form>
            </AddTodoWrapper>
        </>
    );
};

export default AddTodo;
