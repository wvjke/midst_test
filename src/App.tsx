import "./App.css";
import TodosList from "./Components/TodosList/TodosList";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";
import { useState, useEffect } from "react";
import { TodoButton } from "./Components/AddTodo/AddTodo.styled";
function App() {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "dark" ? darkTheme : lightTheme;
    });

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === lightTheme ? darkTheme : lightTheme
        );
    };

    useEffect(() => {
        localStorage.setItem("theme", theme === lightTheme ? "light" : "dark");
    }, [theme]);

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    height: "100vh",
                    paddingTop: "200px",
                }}
            >
                <TodosList />
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <TodoButton
                        color={theme.colors.primary}
                        onClick={() => toggleTheme()}
                    >
                        {theme === lightTheme ? "Dark" : "light"}
                    </TodoButton>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
