import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './layout/Layout';

import { withProviders } from './providers/withProviders';
import { routesConfig } from './lib/routes.config';
import { PAGES } from './lib/routes.types';

import './styles/global.scss';
import './styles/vars.scss';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  // TODO как подключим uuid, в key надо будет передавать его
  return (
    <Routes>
      <Route path="*" element={<Navigate to={`${PAGES.not_found}`} />} />
      {routesConfig.map((route, idx) => (
        <Route element={<Layout />} key={idx}>
          <Route
            path={route.path}
            element={React.createElement(route.Component)}
            key={idx}
          />
        </Route>
      ))}
    </Routes>
  );
}

export default withProviders(App);
