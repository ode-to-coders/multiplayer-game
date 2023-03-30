import { TableCell } from '@mui/material';

type StyledTableCell = {
  children: React.ReactNode;
  styles?: Record<string, string | number>;
  [key: string]: unknown;
};

export const StyledTableCell = (props: StyledTableCell) => (
  <TableCell
    sx={{
      padding: '0.625rem 0.125rem',
      color: 'var(--color-primary)',
      fontSize: '0.625rem',
      lineHeight: '0.625rem',
      ...props.styles,
    }}
    {...props}>
    {props.children}
  </TableCell>
);
