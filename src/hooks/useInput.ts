import { useReducer } from 'react';

function reducer(state: any, action: any) {
	return {
		...state,
		[action.name]: action.value,
	};
}

export default function useInputs(initialForm: any) {
	const [state, dispatch] = useReducer(reducer, initialForm);
	const onChange = (e: any) => {
		dispatch(e.target);
	};
	return [state, onChange];
}
