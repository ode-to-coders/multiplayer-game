import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import { TopicsT, Subject} from './types';

import styles from './index.module.scss';


function Forum(props: TopicsT) {
  const {
    topics
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const styledTable= {
    backgroundColor: 'var(--color-layout)',
    color: 'var(--color-primary)',
    align: 'left'
  };

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      ...styledTable,
      borderBottom: '1px solid var(--color-divider)',
      minWidth: 170,
      align: 'left'
    },
    [`&.${tableCellClasses.body}`]: {
      ...styledTable
    },
  }));

  return (
    <Paper sx={{ background: 'var(--color-layout)' }}
      className={styles.paper}
    >
      <TableContainer className={styles.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Тема
              </StyledTableCell>
              <StyledTableCell>
                Комментарии
              </StyledTableCell>
              <StyledTableCell>
                Создатель
              </StyledTableCell>
              <StyledTableCell>
                Дата
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topics.map((item: Subject, i: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <StyledTableCell>
                      {item.subject}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.comments_count}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.user.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.date}
                    </StyledTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={styles.pagination}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={topics.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Forum;
