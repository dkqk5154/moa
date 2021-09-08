import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import jwt from 'jsonwebtoken';

import useCurrentUser from 'hooks/useCurrentUser';
import { useCookies } from 'react-cookie';

const CurrentUserContext = createContext<any | null>(null);

const CurrentUserProvider = ({ children }: any) => {
	const [cookies] = useCookies();
	const [currentUser, setCurrentUser] = useState(cookies?.id_token);
	const [isLogin, setIsLogin] = useState(true);

	const { getCurrentUser } = useCurrentUser();

	useEffect(() => {
		setCurrentUser(cookies?.id_token);
	}, [cookies]);

	useEffect(() => {
		const tokenReload = setInterval(() => {
			if (jwt.decode(currentUser) !== null) {
				const jwtParseResult = jwt.decode(currentUser);
				const idTokenExpFormat = Number(
					moment
						.unix((jwtParseResult as any).exp)
						.format('YYMMDDHHmmss'),
				);
				const todayFormat = Number(moment().format('YYMMDDHHmmss'));
				// console.log('todayFormat : ', todayFormat);
				// console.log(
				// 	'format result : ',
				// 	idTokenExpFormat < todayFormat,
				// );
				if (idTokenExpFormat < todayFormat) {
					console.log(
						'---------------token reload-------------------',
					);
					getCurrentUser().then(res => {
						console.log('reload token : ', res);

						setCurrentUser(res);
					});
				}
			} else {
				setIsLogin(false);
			}
		}, 1000);
		if (isLogin === false) clearInterval(tokenReload);
		return () => clearInterval(tokenReload);
	});

	return (
		<CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
			{children}
		</CurrentUserContext.Provider>
	);
};

export { CurrentUserContext, CurrentUserProvider };

CurrentUserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
