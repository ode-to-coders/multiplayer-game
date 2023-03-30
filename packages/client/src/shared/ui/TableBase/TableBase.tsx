import { Table, TableBody, TableHead, TableRow } from '@mui/material';

import style from './index.module.scss';
import { StyledTableContainer } from '../Styled/StyledTableContainer';
import { StyledTableCell } from '../Styled/StyledTableCell';

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
    <StyledTableContainer styles={{ marginTop: '1.25rem' }}>
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
                      <img className={style.image} src={avatar} />
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
