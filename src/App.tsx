import "./App.css";
import TodosList from "./Components/TodosList/TodosList";
import { ToastContainer } from "react-toastify";
function App() {
    return (
        <>
            <TodosList />
            <ToastContainer
                position="top-center"
                autoClose={1500}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    );
}

export default App;
