import React from 'react';
import ReactDOM from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import App from './app/ui/App/App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { BrowserRouter } from 'react-router-dom';
import createEmotionCache from './utils/createEmotionCache';

const cache = createEmotionCache();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <CacheProvider value={cache}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </CacheProvider>
);
