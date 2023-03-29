import { Container } from '@mui/material';

type StyledContainer = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledContainer = (props: StyledContainer) => (
  <Container
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '30vh',
      backgroundColor: 'var(--color-layout)',
    }}
    {...props}>
    {props.children}
  </Container>
);
