import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { getSession, signOut } from 'api/cognito';
// import jwt from 'jsonwebtoken';

function useCurrentUser() {
	const [cookies, setCookie] = useCookies();

	// eslint-disable-next-line
	let { id_token = '' } = cookies;

	const sessionRemove = async () => {
		await signOut();
		localStorage.clear();
		sessionStorage.clear();
	};

	// const decodeIdToken = jwt.decode(accessToken) as { [key: string]: any };

	const getCurrentUser = useCallback(async () => {
		try {
			const token = await getSession();
			const idToken = token?.signInUserSession?.idToken?.jwtToken;
			setCookie('id_token', idToken, { path: '/' });
			return idToken;
		} catch (error) {
			if (error === null) {
				await sessionRemove();
			}
			throw error;
		}
		// eslint-disable-next-line
	}, [id_token]);

	const deleteSession = async () => {
		try {
			await sessionRemove();
		} finally {
			window.location.href = '/login';
		}
	};

	return {
		// name: decodeIdToken ? decodeIdToken['name'] : '',
		id_token,
		getCurrentUser,
		deleteSession,
	};
}

export default useCurrentUser;
