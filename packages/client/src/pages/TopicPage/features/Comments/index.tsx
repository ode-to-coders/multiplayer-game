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
import { TUWState } from '../../types';


type TProps = {
  topic_id: number;
  children: IComment[];
  UWComment?: [TUWState, Dispatch<SetStateAction<TUWState>>];
};

export function Comments(props: TProps) {
  console.log(props.children)
  const [stateUWComment, setStateUWComment] = props.UWComment ?? useState<TUWState>({idComment: -1, toogleUorW: 0})
  
  const { children, topic_id } = props;
  const { data: userData } = useGetUserInfoQuery();
  
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = (id: number, topicId: number) => {
    deleteComment({id, topicId});
    setStateUWComment({
      idComment: -1,
      toogleUorW: 0
    })
  }

  const handleUpdateComment = (idComment: number) => {
    setStateUWComment({
      idComment,
      toogleUorW: 1
    })
  };

  const handleWriteComment = (idComment: number) => {
    setStateUWComment({
      idComment,
      toogleUorW: 2
    })
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
              <div className={styles.username}>{comment.author}</div>
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
                onClick={() => {handleWriteComment(comment.id); console.log(comment.comments)}}>
                📝
              </StyledButton>
            </Box>
          {comment.id === stateUWComment.idComment && stateUWComment.toogleUorW === 1 && (
            <UpdateComment
              comment_id={comment.id}
              topic_id={topic_id}
              author={comment.author}
              old_content={comment.content}
              setStateUWComment={setStateUWComment}
            />
          )}
          {comment.id === stateUWComment.idComment && stateUWComment.toogleUorW === 2 && (
            <WriteComment
              topic_id={topic_id}
              author={comment.author}
              parent_id={comment.id}
              depth={comment.depth + 1}
              baseState={true}
              setStateUWComment={setStateUWComment}
            />
          )}
          {(comment.comments.length !== 0) && (
            <Comments
              key={Math.random()}
              topic_id={topic_id}
              children={comment.comments}
              UWComment={[stateUWComment, setStateUWComment]}
            />
          )}
          
        </div>
      ))}
    </>
  );
}

