import { Avatar, Box } from '@mui/material';
import { StyledButton } from '../../../../shared/ui/Styled';
import { UpdateComment } from '../UpdateComment';

import styles from './index.module.scss';
import cn from 'classnames';

import { Dispatch, SetStateAction, useState } from 'react';
import { useGetUserInfoQuery } from '../../../../app/store/api/auth/authApi';
import { useDeleteCommentMutation } from '../../../../app/store/api/forum/forumApi';

import { IComment } from '../../../../app/store/api/forum/types';
import { WriteComment } from '../WriteComment';
import { COMMENT_STATE, TCommentState } from '../../types';

type TProps = {
  topic_id: number;
  children: IComment[];
  useStateComment?: [TCommentState, Dispatch<SetStateAction<TCommentState>>];
};

export function Comments(props: TProps) {
  const [stateComment, setStateComment] =
    props.useStateComment ??
    useState<TCommentState>({ id: -1, toogle: COMMENT_STATE.OFF });

  const { children, topic_id } = props;
  const { data: userData } = useGetUserInfoQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = (id: number, topicId: number) => {
    deleteComment({ id, topicId });
    setStateComment({
      id: -1,
      toogle: COMMENT_STATE.OFF,
    });
  };

  const handleUpdateComment = (id: number) => {
    setStateComment({
      id,
      toogle: COMMENT_STATE.UPDATE,
    });
  };

  const handleWriteComment = (id: number) => {
    setStateComment({
      id,
      toogle: COMMENT_STATE.WRITE,
    });
  };

  const handleDateComment = (date: Date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    return `${day}.${
      month.toString().length === 2 ? '' : '0'
    }${month} в ${hours}:${
      minutes.toString().length === 2 ? '' : '0'
    }${minutes}`;
  };

  return (
    <>
      {children.map((comment: IComment) => (
        <div key={comment.id} className={styles.wrap}>
          <Box className={styles.comment}>
            <Avatar
              src={`https://ya-praktikum.tech/api/v2/resources${userData?.avatar}`}
            />
            <Box className={styles.info}>
              <div className={styles.wrapName}>
                <div className={styles.username}>{comment.author}</div>
                <div className={styles.date}>
                  {handleDateComment(comment.updatedAt)}
                </div>
              </div>
              <div className={styles.text}>{comment.content}</div>
            </Box>
          </Box>
          <Box className={styles.comment__setup}>
            {(comment.author === userData?.display_name ||
              comment.author === userData?.login) && (
              <>
                <StyledButton
                  extendсlass={cn(styles.button, styles.btnDelete)}
                  onClick={() =>
                    handleDeleteComment(comment.id, Number(topic_id))
                  }>
                  ✖
                </StyledButton>
                <StyledButton
                  extendсlass={cn(styles.button, styles.btnUpdate)}
                  onClick={() => handleUpdateComment(comment.id)}>
                  🖋️
                </StyledButton>
              </>
            )}
            <StyledButton
              extendсlass={cn(styles.button, styles.btnUpdate)}
              onClick={() => {
                handleWriteComment(comment.id);
              }}>
              📝
            </StyledButton>
          </Box>
          {comment.id === stateComment.id &&
            stateComment.toogle === COMMENT_STATE.UPDATE && (
              <UpdateComment
                comment_id={comment.id}
                topic_id={topic_id}
                author={comment.author}
                old_content={comment.content}
                setStateComment={setStateComment}
              />
            )}
          {comment.id === stateComment.id &&
            stateComment.toogle === COMMENT_STATE.WRITE && (
              <WriteComment
                topic_id={topic_id}
                author={comment.author}
                parent_id={comment.id}
                depth={comment.depth + 1}
                baseState={true}
                setStateComment={setStateComment}
              />
            )}
          {comment.comments.length !== 0 && (
            <Comments
              key={Math.random()}
              topic_id={topic_id}
              children={comment.comments}
              useStateComment={[stateComment, setStateComment]}
            />
          )}
        </div>
      ))}
    </>
  );
}
