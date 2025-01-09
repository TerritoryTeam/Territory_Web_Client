import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query'

import {GlobalProvider} from './providers/GlobalProvider.tsx';

import App from './App.tsx';
import store from './stores/index.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </GlobalProvider>
        </Provider>
    </React.StrictMode>,
)
