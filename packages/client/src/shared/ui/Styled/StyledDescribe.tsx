import { Typography } from '@mui/material';

type StyledDescribe = {
  children: React.ReactNode;
  styles?: Record<string, string | number>;
  [key: string]: unknown;
};

export const StyledDescribe = (props: StyledDescribe) => (
  <Typography
    sx={{
      color: 'var(--color-primary)',
      fontSize: '1.25rem',
      lineHeight: '1.25rem',
      ...props.styles,
    }}
    {...props}>
    {props.children}
  </Typography>
);
