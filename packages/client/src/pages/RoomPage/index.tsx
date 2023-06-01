import * as React from 'react';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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

import { v4 as uuidv4 } from 'uuid';

import { RoomsT, Subject } from './types';
import { StyledButton, StyledContainer } from '../../shared/ui/Styled';
import { ModalBase } from '../../shared/ui';
import { RoomForm } from '../../features';

import styles from './index.module.scss';

export function RoomPage(props: RoomsT) {
  const { rooms } = props;

  const [page, setPage] = useState(0);
  const [gameId, setGameId] = useState(uuidv4());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const pageContent = useMemo(() => {
    return rowsPerPage > 0
      ? rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : rooms;
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

  const handleChangeShowModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const startGame = () => {
    if (gameId) {
      navigate(`${gameId}`);
    }
  };

  return (
    <StyledContainer extendсlass={styles.mainContainer}>
      {showModal && (
        <ModalBase title="Создание комнаты" setOpenCback={setShowModal}>
          <RoomForm />
        </ModalBase>
      )}
      <StyledButton extendсlass={styles.create} onClick={handleChangeShowModal}>
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
                    <TableCell className={styles.cell}>
                      <StyledButton
                        onClick={startGame}
                        disabled={
                          item.maxPlayers === item.players ? true : undefined
                        }
                        extendсlass={styles.button}>
                        Войти
                      </StyledButton>
                    </TableCell>
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
          labelDisplayedRows={handleChangeDisplayedRows}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </StyledContainer>
  );
}
