import styles from './index.module.scss';

import { useUpdateTopicMutation } from '../../../../app/store/api/forum/forumApi';
import { StyledButton } from '../../../../shared/ui/Styled';
import { Dispatch, SetStateAction } from 'react';

type TProps = {
  topic_id: number;
  author: string | undefined;
  old_content: string | undefined;
  old_name: string | undefined;
  setShowUpdateTopic: Dispatch<SetStateAction<boolean>>
}

export function UpdateTopic(props: TProps) {  
  const { author, topic_id, old_content, old_name, setShowUpdateTopic } = props;

  const [ updateTopic, { isLoading: isLoadingUpdateTopic }] = useUpdateTopicMutation();

  const handleUpdateTopic = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const content = (target.elements[0] as HTMLTextAreaElement).value

    if (isLoadingUpdateTopic) {
      return;
    };

    if (content) {
      updateTopic({
        id: topic_id,
        name: old_name,
        author,
        content
      });
    }

    setShowUpdateTopic(false)
  };

  return (
    <div className={styles.wrapWriteComment}>
      <form 
        onSubmit={handleUpdateTopic} className={styles.formComment}
      >
        <textarea
          className={styles.textAreaComment}
        >{old_content}</textarea>
        <StyledButton type="submit" extendсlass={styles.btnSubmitComment}>
          изменить тему
        </StyledButton>
      </form>
    </div>
  )
}
