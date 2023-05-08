import React from 'react';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

import { StyledContainer, StyledDescribe } from '../../shared/ui/Styled';
import { Layout } from '../../app/layout/Layout';
import { StyledButton } from '../../shared/ui/Styled/StyledButton';

import style from './index.module.scss';

export const ErrorFallbackPage = () => {
  const { resetBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(0);

  // при переходе на другую страницу, сбрасываем ошибку
  useEffect(() => {
    ref.current += 1;

    // смотрим на ref.current, чтобы эффект не срабатывал при первом рендере
    // когда рендерим компонент с ошибкой
    return () => {
      if (ref.current > 1) {
        resetBoundary();
      }
    };
  }, [location.pathname]);

  return (
    <Layout>
      <StyledContainer
        extendсlass={style.container}
        maxWidth={false}
        disableGutters>
        <StyledDescribe variant="body1" className={style.describe}>
          Произошла непредвиденная ошибка
        </StyledDescribe>
        <StyledButton>Вернуться назад</StyledButton>
      </StyledContainer>
    </Layout>
  );
};
