import { useReducer } from 'react';

function reducer(state: any, action: any) {
	return {
		...action,
	};
}

export default function useOnChange(initialForm: any) {
	const [state, dispatch] = useReducer(reducer, initialForm);
	const onChange = (e: any) => {
		dispatch(e);
	};
	return [state, onChange];
}
