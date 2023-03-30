import { Typography } from '@mui/material';

type StyledTitle = {
  children: React.ReactNode;
  styles?: Record<string, string | number>;
  [key: string]: unknown;
};

export const StyledTitle = (props: StyledTitle) => (
  <Typography
    sx={{
      color: 'var(--color-primary)',
      fontSize: '2.5rem',
      lineHeight: '2.5rem',
      ...props.styles,
    }}
    {...props}>
    {props.children}
  </Typography>
);