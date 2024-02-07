import { TodoInput, AddTodoWrapper } from './AddTodo.styled'
// import {
//     getTodos,
//     todosUrlEndpoint as cacheKey,
// } from "../../api/todosApi";
// import useSWR from "swr";
import { useRef } from 'react'
// import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
const AddTodo = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	// const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
	//     e.preventDefault();
	//     console.log(inputRef.current?.value)
	//     // try {
	//     //     await addTodo({
	//     //         text: inputRef.current
	//     //             ? inputRef.current.value
	//     //             : "nothing here",
	//     //         completed: false,
	//     //     });
	//     //     toast.success("Todo added successfully");
	//     //     mutate();
	//     //     if (inputRef.current) {
	//     //         inputRef.current.value = "";
	//     //     }
	//     // } catch (err) {
	//     //     console.error(err);
	//     // }
	// };

	function onSubmit(e:FormDataEvent) {
		e.preventDefault();
        let captcha = grecaptcha.getResponse();
        console.log(captcha);
	}

	return (
		<AddTodoWrapper>
			<form
				onSubmit={onSubmit}
				style={{ display: 'flex', width: '100%', gap: '20px' }}
				id='demo-form'
				method='POST'
			>
				<TodoInput required ref={inputRef} />
				<button
					className='g-recaptcha'
					data-sitekey='6LekMWspAAAAALwpi8hCrBZj1cMI1vyIE4aORfcA'
				>
					Submit
				</button>
			</form>
		</AddTodoWrapper>
	)
}

export default AddTodo
