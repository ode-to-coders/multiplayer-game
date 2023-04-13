import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { RoomsT, Subject } from './types';
import { StyledButton, StyledContainer } from '../../shared/ui/Styled';
import { PAGES } from '../../app/lib/routes.types';
import { ModalBase } from '../../shared/ui';
import { RoomForm } from '../../features';

import styles from './index.module.scss';


export function RoomPage(props: RoomsT) {
  const { rooms } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const pageContent =
    rowsPerPage > 0
      ? rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rooms;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  const handleChangeShowModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  return (
    <StyledContainer>
      {showModal && (
        <ModalBase title="Создание комнаты" setOpenCback={setShowModal}>
          <RoomForm />
        </ModalBase>
      )}
      <StyledButton onClick={handleChangeShowModal}>
        Создать комнату
      </StyledButton>
      <Paper className={styles.paper}>
        <TableContainer className={styles.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={styles.header}>
              <TableRow>
                <TableCell className={styles.cell}>Название</TableCell>
                <TableCell className={styles.cell}>Игроков</TableCell>
                <TableCell className={styles.cell}>Создатель</TableCell>
                <TableCell className={styles.cell}></TableCell>
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
                      {item.players}/{item.maxPlayers}
                    </TableCell>
                    <TableCell className={styles.cell}>
                      {item.user.name}
                    </TableCell>
                    {item.players.toString() === item.maxPlayers.toString() ? (
                      <TableCell className={styles.cell}>
                        <StyledButton
                          disabled
                          extendClass={styles.buttonDisabled}>
                          <Link to={PAGES.START_GAME}>Войти</Link>
                        </StyledButton>
                      </TableCell>
                    ) : (
                      <TableCell className={styles.cell}>
                        <StyledButton extendClass={styles.button}>
                          <Link to={PAGES.START_GAME}>Войти</Link>
                        </StyledButton>
                      </TableCell>
                    )}
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
          count={rooms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Всего страниц"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} из ${count}`
          }
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </StyledContainer>
  );
}
