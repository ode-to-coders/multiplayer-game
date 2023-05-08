import * as React from 'react';
import { useState, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination, {
  LabelDisplayedRowsArgs,
} from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { StyledContainer } from '../../shared/ui/Styled';

import { TopicsT, Subject } from './types';

import styles from './index.module.scss';


export function ForumPage(props: TopicsT) {
  const { topics } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pageContent = useMemo(() => {
    return rowsPerPage > 0
      ? topics.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : topics;
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  const handleChangeDisplayedRows = ({
    from,
    to,
    count,
  }: LabelDisplayedRowsArgs): string => {
    const pages = useMemo(() => {
      return `${from}-${to} из ${count}`;
    }, [from, to, count]);
    return pages;
  };

  return (
    <StyledContainer extendсlass={styles.mainContainer}>
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
              {pageContent.map((item: Subject, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell className={styles.cell}>
                      {item.subject}
                    </TableCell>
                    <TableCell className={styles.cell}>
                      {item.comments_count}
                    </TableCell>
                    <TableCell className={styles.cell}>
                      {item.user.name}
                    </TableCell>
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
          labelRowsPerPage="Всего страниц"
          labelDisplayedRows={handleChangeDisplayedRows}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </StyledContainer>
  );
}
