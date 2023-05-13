import React from 'react';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/react';
import { StaticRouter } from 'react-router-dom/server';
import App from './src/app/ui/App/App';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';

export function render(url: string, cache: any) {
  return renderToString(
    <CacheProvider value={cache}>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </CacheProvider>
  );
}