import { useReducer } from 'react';

function reducer(state: any, action: any) {
	if (action.name === 'all' && action.checked) {
		let result: any = {};
		Object.keys(state).map((res: any) => {
			result[res] = true;
			return res;
		});
		return result;
	} else if (action.name === 'all' && !action.checked) {
		let result: any = {};
		Object.keys(state).map((res: any) => {
			result[res] = false;
			return res;
		});
		return result;
	}

	let isAll = true;
	let result = { ...state, [action.name]: action.checked };

	Object.keys(result).map((res: any) => {
		if (res !== 'all' && !result[res]) {
			isAll = false;
		}
		return res;
	});

	return {
		...result,
		all: isAll,
	};
}

export default function useInputs(initialForm: any) {
	const [state, dispatch] = useReducer(reducer, initialForm);
	const onChange = (e: any) => {
		dispatch(e.target);
	};
	return [state, onChange];
}
