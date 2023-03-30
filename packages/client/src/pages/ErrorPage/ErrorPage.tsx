import { Link } from 'react-router-dom';

import { PAGES } from '../../app/lib/routes.types';

import {
  StyledContainer,
  StyledDescribe,
  StyledTitle,
} from '../../shared/ui/Styled';
import style from './index.module.scss'

type ErrorPageProps = {
  code: number;
  text: string;
};

export const ErrorPage = (props: ErrorPageProps) => {
  const { code, text } = props;
  return (
    <StyledContainer
      className={style.container}
      maxWidth={false}
      disableGutters>
      <StyledTitle variant="h1">{code}</StyledTitle>
      <StyledDescribe variant="body1" className={style.describe}>
        {text}
      </StyledDescribe>
      <Link className={style.link} to={PAGES.MAIN}>
        Назад на главную
      </Link>
    </StyledContainer>
  );
};
