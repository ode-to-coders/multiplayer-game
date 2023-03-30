import { Link } from 'react-router-dom';

import { PAGES } from '../../app/lib/routes.types';

import { StyledContainer, StyledDescribe, StyledTitle } from '../../shared/ui/Styled';
import { styles } from './styles';

type ErrorType = {
  code: number;
  text: string;
};

export const ErrorPage = (props: ErrorType) => {
  const { code, text } = props;
  return (
    <StyledContainer
      maxWidth={false}
      disableGutters
      styles={styles.container}>
      <StyledTitle variant="h1">{code}</StyledTitle>
      <StyledDescribe variant="body1" styles={styles.describe}>
        {text}
      </StyledDescribe>
      <Link
        style={styles.link}
        to={PAGES.main}>
        Назад на главную
      </Link>
    </StyledContainer>
  );
};
