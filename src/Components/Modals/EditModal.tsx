import Modal from "react-modal";
import { TodoButton } from "../AddTodo/AddTodo.styled";
import {
    getTodos,
    updateTodo,
    todosUrlEndpoint as cacheKey,
    Todo,
} from "../../api/todosApi";
import { TodoInput } from "../AddTodo/AddTodo.styled";
import useSWR from "swr";
import { useTheme } from "styled-components";
import { useRef } from "react";
import { toast } from "react-toastify";
interface IEditModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    todo: Todo;
}

const customStyles = {
    content: {
        width: "300px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

const EditModal: React.FC<IEditModalProps> = ({
    isModalOpen,
    closeModal,
    todo,
}) => {
    const { mutate } = useSWR(cacheKey, getTodos);
    const inputRef = useRef<HTMLInputElement>(null);
    const theme = useTheme();

    const handleEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const text = inputRef.current ? inputRef.current.value : "";
            const editedTodo = { ...todo, text };
            await updateTodo(editedTodo);
            toast.info("Todo edited succesfully");
            mutate();
            closeModal();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={{
                content: {
                    ...customStyles.content,
                    color: theme.colors.text,
                    backgroundColor: theme.colors.background,
                },
                overlay: {
                    backgroundColor: `${theme.colors.background}99`,
                },
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                Edit Todo Text
            </h3>
            <form
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                }}
                onSubmit={handleEditTodo}
            >
                <TodoInput defaultValue={todo.text} ref={inputRef} required />
                <TodoButton color="#4caf50">Submit</TodoButton>
            </form>
        </Modal>
    );
};

export default EditModal;
