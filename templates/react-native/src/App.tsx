import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import theme from 'src/theme';
import Navigator from './Navigator';
import store from './store';
import i18nextInstance from './translations';

const App = () => {
	useEffect(() => {
		i18nextInstance.changeLanguage('en-US');
	}, []);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<I18nextProvider i18n={i18nextInstance}>
					<Navigator />
				</I18nextProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
