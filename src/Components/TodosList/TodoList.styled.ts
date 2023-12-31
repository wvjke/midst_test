import { styled } from "styled-components";

export const TodoListWrapper = styled.div`
    margin: 0 auto;
    width: 800px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px 5px grey;
`;

export const TodoListHeader = styled.div`
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 20px;
`;

export const NoTodos = styled.div`
    text-align: center;
    font-size: 28px;
    font-weight: 600;
`;

export const StyledSpinner = styled.svg`
    animation: rotate 2s linear infinite;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;

    & .path {
        stroke: #5652bf;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`;
