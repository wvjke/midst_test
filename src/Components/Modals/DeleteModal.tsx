import Modal from "react-modal";
import { TodoButton } from "../AddTodo/AddTodo.styled";
import {
    getTodos,
    deleteTodo,
    todosUrlEndpoint as cacheKey,
    Todo,
} from "../../api/todosApi";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useTheme } from "styled-components";

interface IDeleteModalProps {
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

const DeleteModal: React.FC<IDeleteModalProps> = ({
    isModalOpen,
    closeModal,
    todo,
}) => {
    const { mutate } = useSWR(cacheKey, getTodos);
    const theme = useTheme();
    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(todo.id);
            toast.info("Todo deleted succesfully");
            mutate();
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
            <h3 style={{ textAlign: "center" }}>
                Are you sure you want to delete this Todo?
            </h3>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "20px",
                }}
            >
                <TodoButton color="#4caf50" onClick={handleDeleteTodo}>
                    Confirm
                </TodoButton>
                <TodoButton color="#f44336" onClick={() => closeModal()}>
                    Cancel
                </TodoButton>
            </div>
        </Modal>
    );
};

export default DeleteModal;
