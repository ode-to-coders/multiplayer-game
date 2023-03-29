import { TableCell } from '@mui/material';

type StyledTableCell = {
  children: React.ReactNode;
  [key:string]: unknown
};

export const StyledTableCell = (props: StyledTableCell) => (
  <TableCell
    sx={{
      padding: '0.625rem 0.125rem',
      color: 'var(--color-primary)',
      fontSize: '0.625rem',
      lineHeight: '0.625rem',
    }}
    {...props}>
    {props.children}
  </TableCell>
);
