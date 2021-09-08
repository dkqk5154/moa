export type routerUrlProps = {
	 [key: string]: { value: string; label: string } ;
};

const defaultRouter:  routerUrlProps = {
	main: {
		value: '/',
		label: '',
	},
	login: {
		value: '/login',
		label: '',
	},
	my: {
		value: '/my',
		label: '',
	},
};

export const mainRouter : routerUrlProps = {
	root : defaultRouter.main
}

export const loginRouter  : routerUrlProps = {
	root : defaultRouter.login
}

export const myRouter : routerUrlProps= {
	root : defaultRouter.my
}
