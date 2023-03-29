import {
  Table,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material';

import { StyledTableCell } from './components/StyledTableCell';
import { StyledTableContainer } from './components/StyledTableContainer';
import { StyledImage } from './components/StyledImage';

type Rows = {
  [key: string]: unknown;
};

type TableBase = {
  rows: Array<Record<number, Rows>>;
  tableNames: Array<string>;
  avatar: string;
};

export const TableBase = (props: TableBase) => {
  const { rows, tableNames, avatar } = props;
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableNames.map(name => (
              <StyledTableCell align="center">{name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              {Object.keys(row).map((key: string) => (
                <StyledTableCell align="center">
                  {key === 'name' ? (
                    <>
                      <StyledImage src={avatar}/>
                      {row[key as unknown as keyof typeof row]}
                    </>
                  ) : (
                    <>{row[key as unknown as keyof typeof row]}</>
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};
