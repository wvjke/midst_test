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
import { useRef } from "react";
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

    const handleEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const text = inputRef.current ? inputRef.current.value : "";
            const editedTodo = { ...todo, text };
            console.log(editedTodo);
            await updateTodo(editedTodo);
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
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h3 style={{ textAlign: "center" }}>Edit Todo Text</h3>
            <form
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
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
