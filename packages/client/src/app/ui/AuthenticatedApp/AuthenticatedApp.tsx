import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routesConfig } from 'app/lib/routes.config';
import { PAGES } from 'app/lib/routes.types';
import { GameLayout } from '@/app/layout/GameLayout';


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
      <Route path='*' element={<Navigate to={`${PAGES.NOTFOUND}`} />} />
      {routesConfig.map((route, idx) => (
        <Route element={<GameLayout />} key={idx}>
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
