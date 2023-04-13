import { Table, TableBody, TableHead, TableRow } from '@mui/material';

import style from './index.module.scss';
import { StyledTableCell, StyledTableContainer } from '../Styled';

type Row = {
  id: number;
  login: string;
  avatar: string;
  score: number;
};

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
            <TableRow key={row.id}>
              <StyledTableCell align="center">
                {idx+1}
              </StyledTableCell>
              <StyledTableCell align="center">
                <img className={style.image} src={avatar} />
                {row.login}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.score}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};
