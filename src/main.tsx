import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {GlobalProvider} from './providers/GlobalProvider.tsx';

import App from './App.tsx';
import store from './stores/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </Provider>
    </React.StrictMode>,
)
