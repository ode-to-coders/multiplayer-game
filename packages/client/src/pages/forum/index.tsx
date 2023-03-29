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

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'var(--color-layout)',
      color: '#fff',
      borderBottom: '1px solid #eee',
    },
    [`&.${tableCellClasses.body}`]: {
      color: '#fff',
      backgroundColor: 'var(--color-layout)',
    },
  }));

  return (
    <Paper sx={{ width: '100%', background: 'var(--color-layout)' }}
      className={styles.container}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align='left'
                style={{ minWidth: 170 }}
              >
                Тема
              </StyledTableCell>
              <StyledTableCell
                align='left'
                style={{ minWidth: 170 }}
              >
                Комментарии
              </StyledTableCell>
              <StyledTableCell
                align='left'
                style={{ minWidth: 170 }}
              >
                Создатель
              </StyledTableCell>
              <StyledTableCell
                align='left'
                style={{ minWidth: 170 }}
              >
                Дата
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topics.map((item: Subject, i: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    <StyledTableCell align="left">
                      {item.subject}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.comments_count}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.user.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
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
