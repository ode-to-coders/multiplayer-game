import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { routesConfig } from '../../lib/routes.config';
import { PAGES } from '../../lib/routes.types';
import { GameLayout } from '../../layout/GameLayout';

export const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={`${PAGES.NOTFOUND}`} />} />
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
