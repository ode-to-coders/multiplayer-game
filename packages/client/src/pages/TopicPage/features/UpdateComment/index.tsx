import styles from './index.module.scss';

import { useUpdateCommentMutation } from '../../../../app/store/api/forum/forumApi';
import { Dispatch, SetStateAction } from 'react';
import { StyledButton } from '../../../../shared/ui/Styled';

import { COMMENT_STATE, TCommentState } from '../../types';

type TProps = {
  comment_id: number;
  topic_id: number;
  author: string;
  old_content: string;
  setUpdateCommentId?: Dispatch<SetStateAction<number>>;
  setStateComment?: Dispatch<SetStateAction<TCommentState>>;
}

export function UpdateComment(props: TProps) {  
  const { 
    comment_id, topic_id, author, old_content, setUpdateCommentId, setStateComment } = props;
  
  const [ updateComment, { isLoading: isLoadingUpdateComment }] = useUpdateCommentMutation();

  const handleUpdateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const content = (target.elements[0] as HTMLTextAreaElement).value

    if (isLoadingUpdateComment) {
      return;
    };

    if (content && content !== old_content) {
      updateComment({
        id: comment_id,
        topic_id,
        author,
        content
      });
    }

    setUpdateCommentId && setUpdateCommentId(-1);
    setStateComment && setStateComment({
      id: -1,
      toogle: COMMENT_STATE.OFF
    });
  };
  
  return (
    <div className={styles.wrapWriteComment}>
      <form 
        onSubmit={handleUpdateComment} className={styles.formComment}
      >
        <textarea
          className={styles.textAreaComment}
        >{old_content}</textarea>
        <StyledButton type="submit" extendсlass={styles.btnSubmitComment}>
          Изменить комментарий
        </StyledButton>
      </form>                
    </div>
  )
}
