import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/react';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';

import { routesConfig } from './src/app/lib/routes.config';
import { store } from './src/app/store/store';

export function render(url: string, cache: any) {
  return renderToString(
    <CacheProvider value={cache}>
     <Provider store={store}>
      <StaticRouter location={url}>
        <Routes>
          {routesConfig.map((page) => (
            <Route
              key={page.path}
              element={page.Component()}
              path={page.path} 
            />
          ))}
        </Routes>
      </StaticRouter>
    </Provider>
    </CacheProvider>
  );
}
