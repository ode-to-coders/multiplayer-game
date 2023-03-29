import { TableContainer } from '@mui/material';

type StyledTableContainer = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export const StyledTableContainer = (props: StyledTableContainer) => (
  <TableContainer
    sx={{
      border: '0.0625rem solid var(--color-grey)',
      borderRadius: '0.3125rem',
      marginTop: '1.25rem',
    }}
    {...props}>
    {props.children}
  </TableContainer>
);
