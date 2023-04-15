import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from 'app/layout/Layout';

import { routesConfig } from 'app/lib/routes.config';
import { PAGES } from 'app/lib/routes.types';

export const AuthenticatedApp = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Navigate to={`${PAGES.NOTFOUND}`} />} />
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
};
