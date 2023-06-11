import React from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { PAGES } from '../../lib/routes.types';
import { Layout } from '../../layout/Layout';
import { AUTH_ROUTES } from '../../lib/routes.config';

export const UnauthenticatedApp = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get('code');

  return (
    <Routes>
      <Route
        path="*"
        element={<Navigate to={`${PAGES.SIGNIN}/?code=${authCode}`} />}
      />
      {AUTH_ROUTES.map((route, idx) => (
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
