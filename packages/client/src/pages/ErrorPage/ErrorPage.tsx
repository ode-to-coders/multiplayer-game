import { Link } from 'react-router-dom';

import { PAGES } from '@/app/lib/routes.types';

import { StyledContainer } from './components/StyledContainer';
import { StyledTitle } from './components/StyledTitle';
import { StyledDescribe } from './components/StyledDescribe';

type ErrorType = {
  code: number;
  text: string;
};

export const ErrorPage = (props: ErrorType) => {
  const { code, text } = props;
  return (
    <StyledContainer maxWidth={false} disableGutters>
      <StyledTitle variant="h1">{code}</StyledTitle>
      <StyledDescribe variant="body1">{text}</StyledDescribe>
      <Link
        style={{
          color: 'var(--color-blue)',
          marginTop: '4.375rem',
          textDecoration: 'none',
          fontSize: '0.6875rem',
          lineHeight: '0.6875rem',
        }}
        to={PAGES.main}>
        Назад на главную
      </Link>
    </StyledContainer>
  );
};
