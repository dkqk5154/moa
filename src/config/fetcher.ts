import axios from 'axios';

export default function createFetcher(idToken: string) {
	return async function fetcher(args: string) {
		const API = axios.create({
			baseURL: process.env.REACT_APP_API_URL || '',
			headers: {
				Authorization: idToken,
			},
		});
		const res = await API.get(args);
		return res.data;
	};
}
