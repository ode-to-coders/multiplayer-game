import { PAGES } from '@/app/lib/routes.types';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { style } from './style';

type ErrorType = {
  code: number;
  text: string;
};

export const ErrorPage = (props: ErrorType) => {
  const { code, text } = props;
  return (
    <Container maxWidth={false} disableGutters sx={style.container}>
      <Typography variant="h1" sx={style.title}>
        {code}
      </Typography>
      <Typography variant="body1" sx={style.describe}>
        {text}
      </Typography>
      <Link style={style.link} to={PAGES.main}>
        Назад на главную
      </Link>
    </Container>
  );
};
