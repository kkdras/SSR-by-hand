import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { store } from "./app/redux-store";
import { hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root');

const root = hydrateRoot(container as HTMLElement, <BrowserRouter>
	<Provider store={store}>
		<App />
	</Provider>
</BrowserRouter>);
