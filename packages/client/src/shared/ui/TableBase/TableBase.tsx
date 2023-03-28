import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

type Rows = {
  [key: string]: unknown;
};

type TableBase = {
  rows: Array<Record<number, Rows>>;
  style: Record<string, Record<string, string | number>>;
  tableNames: Array<string>;
  avatar: string;
};

export const TableBase = (props: TableBase) => {
  const { rows, style, tableNames, avatar } = props;
  return (
    <TableContainer sx={style.table}>
      <Table>
        <TableHead>
          <TableRow>
            {tableNames.map(name => (
              <TableCell sx={style.tableCell} align="center">
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              {Object.keys(row).map((key: string) => (
                <TableCell sx={style.tableCell} align="center">
                  {key === 'name' ? (
                    <>
                      <img src={avatar} style={style.image} />
                      {row[key as unknown as keyof typeof row]}
                    </>
                  ) : (
                    <>{row[key as unknown as keyof typeof row]}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
