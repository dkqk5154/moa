import { Suspense, lazy, useContext, useMemo } from 'react';
import { SWRConfig } from 'swr';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ModalProvider } from 'react-modal-hook';

import createFetcher from 'config/fetcher';

import theme from 'styles/theme';

import Spinner from 'components/atoms/Spinner';

import { mainRouter } from 'config/routerUrl';

import { CurrentUserContext } from 'contexts/CurrentUserContext';
// import useInterval from 'hooks/useInterval';

const MainPage = lazy(() => import('pages/MainPage'));

// const TermPage = lazy(() => import('pages/TermPage'));
// const PrivacyPage = lazy(() => import('pages/PrivacyPage'));

// const Privacy = lazy(() => importMDX('pages/Privacy.mdx'));

const swrConfig: object = {
	onErrorRetry: (
		error: any,
		key: any,
		option: any,
		revalidate: any,
		{ retryCount }: any,
	) => {
		if (retryCount >= 3) return;
		if (error.response) {
			if (error.response.status === 404) return;
		}
		setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
		// if (error.response && error.response.status === 403) {
		// 	Swal.fire(globalSwal.apiErr);
		// 	return;
		// }
	},
};

const Styled = {
	Wrapper: styled.div`
		width: 100%;
		height: 100vh;
	`,
};

function App() {
	const [currentUser] = useContext(CurrentUserContext);

	const fetcher = useMemo(() => createFetcher(currentUser), [currentUser]);

	return (
		<Router>
			<SWRConfig value={{ ...swrConfig, fetcher }}>
				<ThemeProvider theme={theme}>
					<ModalProvider>
						<Styled.Wrapper>
							<Suspense
								fallback={
									<Spinner height="80vh" size={'10rem'} />
								}
							>
								<Switch>
									<Route
										exact
										path={mainRouter.root.value}
										component={MainPage}
									/>

									<Route
										component={() => {
											return <div>Err</div>;
										}}
									/>
								</Switch>
							</Suspense>
						</Styled.Wrapper>
					</ModalProvider>
				</ThemeProvider>
			</SWRConfig>
		</Router>
	);
}

export default App;
