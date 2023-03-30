import { Container } from '@mui/material';

type StyledContainer = {
  children: React.ReactNode;
  styles?: Record<string, string | number>;
  [key: string]: unknown;
};

export const StyledContainer = (props: StyledContainer) => (
  <Container
    sx={{
      height: '100vh',
      backgroundColor: 'var(--color-layout)',
      ...props.styles,
    }}
    {...props}>
    {props.children}
  </Container>
);
