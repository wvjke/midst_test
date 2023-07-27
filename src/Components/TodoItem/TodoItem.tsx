import React, { ChangeEvent } from "react";
import {
    TodoItemWrapper,
    TodoCheckbox,
    TodoText,
    EditIconWrapper,
    DeleteIconWrapper,
    TodoCreatedText,
} from "./Todo.styled";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteModal from "../Modals/DeleteModal";
import useSWR from "swr";
import {
    getTodos,
    Todo,
    updateTodo,
    todosUrlEndpoint as cacheKey,
} from "../../api/todosApi";
import EditModal from "../Modals/EditModal";
import dayjs from "dayjs";

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { mutate } = useSWR(cacheKey, getTodos);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    const handleCheckBoxChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const completed = e.target.checked;
            const editedTodo = { ...todo, completed };
            await updateTodo(editedTodo);
            mutate();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <TodoItemWrapper completed={todo.completed.toString()}>
                <div>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        <TodoCheckbox
                            onChange={handleCheckBoxChange}
                            checked={todo.completed}
                        />
                        <TodoText completed={todo.completed.toString()}>
                            {todo.text}
                        </TodoText>
                    </div>
                    <TodoCreatedText>
                        created:
                        {dayjs.unix(todo.createdAt).format(" DD-MM-YYYY HH:mm")}
                    </TodoCreatedText>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <EditIconWrapper onClick={() => setIsEditModalOpen(true)}>
                        <AiFillEdit size={20} color="white" />
                    </EditIconWrapper>
                    <DeleteIconWrapper
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        <AiFillDelete size={20} color="white" />
                    </DeleteIconWrapper>
                </div>
            </TodoItemWrapper>
            <DeleteModal
                isModalOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                todo={todo}
            />
            <EditModal
                isModalOpen={isEditModalOpen}
                closeModal={() => setIsEditModalOpen(false)}
                todo={todo}
            />
        </>
    );
};

export default TodoItem;
