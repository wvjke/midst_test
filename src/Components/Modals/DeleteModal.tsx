import Modal from "react-modal";
import { TodoButton } from "../AddTodo/AddTodo.styled";
import {
    getTodos,
    deleteTodo,
    todosUrlEndpoint as cacheKey,
    Todo,
} from "../../api/todosApi";
import useSWR from "swr";

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
    const handleDeleteTodo = async () => {
        try {
            await deleteTodo(todo.id);
            mutate();
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
                    Yes
                </TodoButton>
                <TodoButton color="#f44336" onClick={() => closeModal()}>
                    No
                </TodoButton>
            </div>
        </Modal>
    );
};

export default DeleteModal;
