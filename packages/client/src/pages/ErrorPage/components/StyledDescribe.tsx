import { Typography } from '@mui/material';

type StyledDescribe = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledDescribe = (props: StyledDescribe) => (
  <Typography
    sx={{
      color: 'var(--color-primary)',
      fontSize: '1.25rem',
      lineHeight: '1.25rem',
      marginTop: '1.25rem',
    }}
    {...props}>
    {props.children}
  </Typography>
);
