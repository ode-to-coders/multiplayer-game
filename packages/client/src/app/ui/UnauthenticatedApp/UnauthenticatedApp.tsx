import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PAGES } from '@/app/lib/routes.types';
import { Layout } from '@/app/layout/Layout';
import { AUTH_ROUTES } from 'app/lib/routes.config';

export const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={`${PAGES.SIGNIN}`} />} />
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
