import axios from 'axios';
import { useCookies } from 'react-cookie';

function useAPI(): any {
	const [cookies] = useCookies();
	const idToken = cookies?.id_token;

	const API: any = axios.create({
		baseURL: process.env.REACT_APP_API_URL || '',
		headers: {
			Authorization: idToken,
		},
	});

	const test = {
		getAll: () => API.get('/test'),
	};

	return [
		{
			API,
			test,
		},
	];
}

export default useAPI;
