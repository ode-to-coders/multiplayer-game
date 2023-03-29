import { Button } from '@mui/material';

type StyledButton = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledButton = (props: StyledButton) => (
  <Button
    sx={{
      backgroundColor: 'var(--color-blue)',
      color: 'var(--color-primary)',
      borderRadius: '0.5rem',
      width: '11.5rem',
      fontSize: '0.8125rem',
      lineHeight: '0.8125rem',
      textTransform: 'inherit',
      padding: '0.75rem',
    }}
    {...props}>
    {props.children}
  </Button>
);
