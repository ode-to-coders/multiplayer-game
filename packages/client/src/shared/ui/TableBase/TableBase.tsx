import { Table, TableBody, TableHead, TableRow } from '@mui/material';

import style from './index.module.scss';
import { StyledTableCell, StyledTableContainer } from '../Styled';

type Row = {
  place: number;
  name: string;
  rate: number;
};

type RowKey = keyof Row;

type TableBaseProps = {
  rows: Array<Row>;
  tableNames: Array<string>;
  avatar: string;
};

export const TableBase = (props: TableBaseProps) => {
  const { rows, tableNames, avatar } = props;
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableNames.map((name, idx) => (
              <StyledTableCell key={idx} align="center">
                {name}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              {(Object.keys(row) as RowKey[]).map((key, idx) => (
                <StyledTableCell key={idx} align="center">
                  {key === 'name' ? (
                    <>
                      <img className={style.image} src={avatar} />
                      {row[key]}
                    </>
                  ) : (
                    row[key]
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
