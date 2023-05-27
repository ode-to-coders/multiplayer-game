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

import styles from './index.module.scss';

import { useGetTopicsQuery, useCreateTopicMutation, useDeleteTopicMutation } from '../../app/store/api/forum/forumApi';
import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';
import { ITopic } from '../../app/store/api/forum/types';

export function ForumPage() {

  const { data, isError: dataTopicIsError, isLoading: dataTopicIsLoading } = useGetTopicsQuery();
  const [ createTopic ] = useCreateTopicMutation();
  const [input, setInput] = useState('name')
  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    console.log(input)
  }  

  const { data: userData, isError, isFetching } = useGetUserInfoQuery();
  const handleCreateTopic = async (newTopic: {name: string, author: string, content: string}) => {
    try {
      const response = await createTopic(newTopic);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCreate = () => {
    handleCreateTopic({
      name: input,
      author: userData?.display_name ?? 'anonim',
      content: 'lorem ipsum dolor sit amet, consectetur adipisicing elit'
    })
  }
  const [ deleteTopic ] = useDeleteTopicMutation();
  const handleDelete = (topic: ITopic) => {
    deleteTopic(topic.id)
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

  // data.map((item, index) => console.log(item, index))

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
                    <button onClick={handleCreate}>Cоздать<br/>тему</button>
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
                          <button onClick={() => handleDelete(item)}>удалить<br/>тему</button>
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
            count={data?.length as number}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Всего страниц"
            labelDisplayedRows={handleChangeDisplayedRows}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      <input value={input} onChange={handleSetInput} />
      <button onClick={handleCreate}>Создать тему</button>
      <input value={input} onChange={(e) => {console.log(e)}} />
      
      </StyledContainer>
      {/* {showModal && (
        <ModalBase title="Загрузите файл" setOpenCback={setShowModal}>
          <div className={s.modalWrap}>
            <label className={s.inputFileWrap}>
              <input
                className={s.inputFile}
                type="file"
                id="inputAvatar"
                onChange={handleSetTextSelectFile}
              />
              <span className={s.inputFileText}>{textSelectFile}</span>
            </label>

            <FormButton
              className={s.modalButton}
              onClick={handleClickButtonSetAvatar}>
              Поменять
            </FormButton>
          </div>
        </ModalBase>
      )}  */}
    </>
  );
}
