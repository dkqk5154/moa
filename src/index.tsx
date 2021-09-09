import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';

import GlobalStyle from './styles/GlobalStyle';
import 'styles/font.css';

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Provider store={store}>
			<CurrentUserProvider>
				<App />
			</CurrentUserProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
