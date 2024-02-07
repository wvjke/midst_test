import useSWR from 'swr'
import { getTodos, todosUrlEndpoint as cacheKey } from '../../api/todosApi'
import TodoItem from '../TodoItem/TodoItem'
import {
	TodoListWrapper,
	NoTodos,
	StyledSpinner,
	TodoListHeader,
} from './TodoList.styled'
import AddTodo from '../AddTodo/AddTodo'

function squareDigits(num: number): number {
	return +num
		.toString()
		.split('')
		.map(el => Math.pow(+el, 2))
		.join('')
}
console.log(squareDigits(928))

const TodosList = () => {
	const { data, error, isLoading } = useSWR(cacheKey, getTodos, {
		onSuccess: data => data.sort((a, b) => +b.id - +a.id),
	})

	if (error)
		return (
			<div style={{ position: 'absolute', top: '50%', left: '50%' }}>
				<h2>Error while fetching todos. Try to reload</h2>
			</div>
		)
	if (isLoading)
		return (
			<div style={{ position: 'absolute', top: '50%', left: '50%' }}>
				<StyledSpinner viewBox='0 0 50 50'>
					<circle
						className='path'
						cx='25'
						cy='25'
						r='20'
						fill='none'
						strokeWidth='4'
					/>
				</StyledSpinner>
			</div>
		)

	return (
		<>
			<TodoListWrapper>
				<TodoListHeader>Todos {`(${data?.length})` || '(0)'}</TodoListHeader>
				<AddTodo />
				{data && data.length > 0 ? (
					data.map(todo => {
						return <TodoItem key={todo.id} todo={todo} />
					})
				) : (
					<NoTodos>No Todos yet</NoTodos>
				)}
			</TodoListWrapper>
		</>
	)
}

export default TodosList
