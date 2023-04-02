import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { TopicsT, Subject} from './types';

import styles from './index.module.scss';

export function Forum(props: TopicsT) {
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

  return (
    <Paper className={styles.paper}>
      <TableContainer className={styles.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={styles.header}>
            <TableRow>
              <TableCell className={styles.cell}>Тема</TableCell>
              <TableCell className={styles.cell}>Комментарии</TableCell>
              <TableCell className={styles.cell}>Создатель</TableCell>
              <TableCell className={styles.cell}>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topics.map((item: Subject, index: number) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell className={styles.cell}>{item.subject}</TableCell>
                  <TableCell className={styles.cell}>{item.comments_count}</TableCell>
                  <TableCell className={styles.cell}>{item.user.name}</TableCell>
                  <TableCell className={styles.cell}>{item.date}</TableCell>
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
        labelRowsPerPage='Всего страниц'
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
