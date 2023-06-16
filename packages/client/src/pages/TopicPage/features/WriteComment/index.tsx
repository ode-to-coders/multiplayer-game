import styles from './index.module.scss';

import { useCreateCommentMutation } from '../../../../app/store/api/forum/forumApi';
import { useState } from 'react';
import { StyledButton } from '../../../../shared/ui/Styled';

import validateAndSanitizeCommentsForm from '../../../../shared/utils/validator';

type TProps = {
  topic_id: number;
  author: string;
};

export function WriteComment(props: TProps) {
  const { author, topic_id } = props;

  const [showTextAreaForComment, setShowTextAreaForComment] = useState(false);

  const [createComment, { isLoading: isLoadingCreateComment }] =
    useCreateCommentMutation();

  const handleCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const content = (target.elements[0] as HTMLTextAreaElement).value;

    const commentFormValidationResult = validateAndSanitizeCommentsForm(content);

    if (isLoadingCreateComment) {
      return null;
    }

    if (commentFormValidationResult.sanitizedData) {
      createComment({
        topic_id,
        author,
        content: commentFormValidationResult.sanitizedData,
        // Поменять на реальный id, если коментарий к топику то null
        // Если комментарий относится к другому комменту то parent_id это id коммента
        // на который отвечаем
        parent_id: null,
      });
    }

    setShowTextAreaForComment(false);
  };

  const handleShowWriteComment = () => {
    setShowTextAreaForComment(true);
  };

  return (
    <div className={styles.wrapWriteComment}>
      {!showTextAreaForComment && (
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
