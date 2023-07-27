import { styled, keyframes } from "styled-components";

export const AddTodoWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
    justify-content: space-between;
`;

export const TodoInput = styled.input.attrs({ type: "text" })`
    padding: 5px;
    border: 2px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;
    width: 100%;
    height: fit-content;
    &:focus {
        border-color: #007bff;
    }
`;

const buttonAnimation = keyframes`
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

export const TodoButton = styled.button`
    background-color: ${(props) => props.color};
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
    width: max-content;
    white-space: nowrap;
    &:hover {
        box-shadow: ${(props) => props.color} 0 1px 7px;
    }
    &:focus {
        outline: none;
        animation: ${buttonAnimation} 0.7s;
    }
`;
