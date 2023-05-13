import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { PAGES } from '../../lib/routes.types';
import { Layout } from '../../layout/Layout';
import { AUTH_ROUTES } from '../../lib/routes.config';

export const UnauthenticatedApp = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    setTimeout(() => {
      searchParams.set('code', '312312');
      setSearchParams(searchParams);
    }, 5000);

    fetchServerData();
  }, []);

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
