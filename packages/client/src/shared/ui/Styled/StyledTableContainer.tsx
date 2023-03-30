import { TableContainer } from '@mui/material';

type StyledTableContainer = {
  children: React.ReactNode;
  styles?: Record<string, string | number>;
  [key: string]: unknown;
};

export const StyledTableContainer = (props: StyledTableContainer) => (
  <TableContainer
    sx={{
      border: '0.0625rem solid var(--color-grey)',
      borderRadius: '0.3125rem',
      ...props.styles,
    }}
    {...props}>
    {props.children}
  </TableContainer>
);
