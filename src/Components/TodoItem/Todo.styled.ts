import { styled } from "styled-components";

interface TodoProps {
    completed: string;
}

export const TodoItemWrapper = styled.div<TodoProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    transition: 0.3s ease all;
    background-color: ${(props) =>
        props.completed === "true" ? "rgba(217, 231, 226, 0.5)" : "inherit"};
`;

export const TodoCheckbox = styled.input.attrs({ type: "checkbox" })``;

export const TodoText = styled.div<TodoProps>`
    text-decoration: ${(props) =>
        props.completed === "true" ? "line-through" : "none"};
`;

export const TodoCreatedText = styled.div`
    font-size: 10px;
`;

const TodoIconWrapper = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
    &:hover {
        scale: 1.1;
        transition: 0.3s scale;
    }
`;

export const EditIconWrapper = styled(TodoIconWrapper)`
    background-color: #4caf50;
`;

export const DeleteIconWrapper = styled(TodoIconWrapper)`
    background-color: #f44336;
`;
