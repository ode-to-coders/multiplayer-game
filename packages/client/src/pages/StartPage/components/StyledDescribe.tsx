import { Typography } from '@mui/material';

type StyledDescribe = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledDescribe = (props: StyledDescribe) => (
  <Typography
    sx={{
      color: 'var(--color-primary)',
    }}
    {...props}>
    {props.children}
  </Typography>
);
