import * as React from 'react';

import { CreateTopic } from '../../features';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTopicsQuery, useDeleteTopicMutation } from '../../app/store/api/forum/forumApi';
import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';
import { ModalBase } from '../../shared/ui';
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

import { StyledButton, StyledContainer } from '../../shared/ui/Styled';

import styles from './index.module.scss';

import { ITopic } from '../../app/store/api/forum/types';
import { PAGES } from '../../app/lib/routes.types';

export function ForumPage() {

  const { data: userData } = useGetUserInfoQuery();
  const { data } = useGetTopicsQuery();
  
  const [ deleteTopic ] = useDeleteTopicMutation();
  const [ isLoadingDelete, setIsLoadingDelete ] = useState(false);
  const handleDelete = async (idTopic: number) => {
    if (isLoadingDelete) {
      return;
    }
    setIsLoadingDelete(true);

    await deleteTopic(idTopic.toString());
    setIsLoadingDelete(false);
  }
  
  const navigate = useNavigate();
  const handleClickTopic = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    idTopic: number
  ) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }
    const PATH = PAGES.TOPIC.replace(':id', idTopic.toString());
    navigate(PATH);
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pageContent = useMemo(() => {
    return rowsPerPage > 0
      ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : data;
  }, [page, rowsPerPage, data]);

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

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
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
                  <TableCell className={styles.cell}>
                    <StyledButton
                      onClick={handleOpenModal}
                      extendсlass={styles.buttonCreate}
                    >
                      Cоздать<br/>тему
                    </StyledButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageContent?.map((item: ITopic, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      hover role="checkbox"
                      tabIndex={-1}
                      className={styles.row}
                      onClick={(e) => handleClickTopic(e, item.id)}
                    >
                      <TableCell className={styles.cell}>
                        {item.name}
                      </TableCell>
                      <TableCell className={styles.cell}>
                        {item.comments_count}
                      </TableCell>
                      <TableCell className={styles.cell}>
                        {item.author}
                      </TableCell>
                      <TableCell className={styles.cell}>
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className={styles.cell}>
                        {
                          item.author === userData?.display_name &&
                          <StyledButton
                            onClick={() => handleDelete(item.id)}
                            extendсlass={styles.button}
                          >
                            удалить<br/>тему
                          </StyledButton>                          
                        }            
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
            count={data ? data.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Всего страниц"
            labelDisplayedRows={handleChangeDisplayedRows}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>      
      </StyledContainer>
      {showModal && (
        <ModalBase title="Новая тема" setOpenCback={setShowModal}>
          <CreateTopic
            setModal={setShowModal}
            author={userData?.display_name ?? 'anonim'}  
          />
        </ModalBase>
      )} 
    </>
  );
}
