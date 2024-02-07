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
        console.log(inputRef.current?.value)
        // try {
        //     await addTodo({
        //         text: inputRef.current
        //             ? inputRef.current.value
        //             : "nothing here",
        //         completed: false,
        //     });
        //     toast.success("Todo added successfully");
        //     mutate();
        //     if (inputRef.current) {
        //         inputRef.current.value = "";
        //     }
        // } catch (err) {
        //     console.error(err);
        // }
    };

    function onSubmit(token) {
        console.log(token);
    }

    return (
        <AddTodoWrapper>
            <form
                style={{ display: "flex", width: "100%", gap: "20px" }}
                id="demo-form" method="POST"
            >
                <TodoInput required ref={inputRef} />
            </form>
            <button className="g-recaptcha" data-sitekey="6LekMWspAAAAALwpi8hCrBZj1cMI1vyIE4aORfcA" data-callback="onSubmit">Submit</button>
        </AddTodoWrapper>
    );
};

export default AddTodo;
