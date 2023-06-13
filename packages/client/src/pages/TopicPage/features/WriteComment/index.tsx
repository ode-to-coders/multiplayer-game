import styles from './index.module.scss';

import { useCreateCommentMutation } from '../../../../app/store/api/forum/forumApi';
import { Dispatch, SetStateAction, useState } from 'react';
import { StyledButton } from '../../../../shared/ui/Styled';

import { TUWState } from '../../types';

type TProps = {
  topic_id: number;
  author: string;
  parent_id: number | null;
  depth: number;
  baseState?: boolean;
  setStateUWComment?: Dispatch<SetStateAction<TUWState>>;
};

export function WriteComment(props: TProps) {
  const { author, topic_id, depth, parent_id, baseState, setStateUWComment } = props;

  const [showTextAreaForComment, setShowTextAreaForComment] = useState(baseState ?? false);

  const [createComment, { isLoading: isLoadingCreateComment }] =
    useCreateCommentMutation();

  const handleCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const content = (target.elements[0] as HTMLTextAreaElement).value;

    if (isLoadingCreateComment) {
      return;
    }

    if (content) {
      createComment({
        topic_id,
        author,
        content,
        depth,
        // Поменять на реальный id, если коментарий к топику то null
        // Если комментарий относится к другому комменту то parent_id это id коммента
        // на который отвечаем
        parent_id
      });
    }

    setShowTextAreaForComment(false);
    setStateUWComment && setStateUWComment({
      idComment: -1,
      toogleUorW: 0
    });
  };

  const handleShowWriteComment = () => {
    setShowTextAreaForComment(true);
  };

  return (
    <div className={styles.wrapWriteComment}>
      {!baseState && !showTextAreaForComment && (
        <StyledButton
          onClick={handleShowWriteComment}
          extendсlass={styles.btnShowComment}>
          написать комментарий
        </StyledButton>
      )}
      {showTextAreaForComment && (
        <form onSubmit={handleCreateComment} className={styles.formComment}>
          <textarea className={styles.textAreaComment} />
          <StyledButton type="submit" extendсlass={styles.btnSubmitComment}>
            написать
          </StyledButton>
        </form>
      )}
    </div>
  );
}
