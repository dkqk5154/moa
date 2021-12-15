import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ModalProvider } from 'react-modal-hook';

import Spinner from 'components/ui/atoms/Spinner';

const MainPage = lazy(() => import('pages/MainPage'));

const Styled = {
	Wrapper: styled.div`
		width: 100%;
		height: 100vh;
	`,
};

function App() {
	return (
		<Router>
			<ModalProvider>
				<Styled.Wrapper>
					<Suspense fallback={<Spinner size={'10rem'} />}>
						<Switch>
							<Route exact path={'/'} component={MainPage} />

							<Route
								component={() => {
									return <div>Err</div>;
								}}
							/>
						</Switch>
					</Suspense>
				</Styled.Wrapper>
			</ModalProvider>
		</Router>
	);
}

export default App;
