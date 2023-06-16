import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { StyledButton } from '../../shared/ui/Styled';
import cn from 'classnames';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { UpdateTopic, WriteComment, Comments } from './features';

import {
  useGetCommentsQuery,
  useGetTopicsQuery,
  useUpdateReactionsMutation,
} from '../../app/store/api/forum/forumApi';
import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';

import Emoji from '../../components/Emoji';

import { TEmoji } from './types';

import styles from './index.module.scss';

export function TopicPage() {
  const { data: userData } = useGetUserInfoQuery();
  const { data } = useGetTopicsQuery();
  const { id } = useParams();
  const topic_id = Number(id);
  const [showUpdateTopic, setShowUpdateTopic] = useState(false);

  const [updateTopicReactions] = useUpdateReactionsMutation();

  const topic = useMemo(() => {
    return data?.find((topic: any) => topic.id === topic_id);
  }, [data]);

  const [reactions, setReactions] = useState<TEmoji[] | undefined>(
    topic?.reactions
  );

  const onEmojiClick = async (symbol: TEmoji, emojis: TEmoji[]) => {
    const emojiIndex = emojis.findIndex(
      ({ reaction }) => reaction === symbol.reaction
    );

    if (emojiIndex !== -1) {
      const updateEmojiCount = {
        reaction: emojis[emojiIndex].reaction,
        count: symbol.count + 1,
      };

      const newEmojis = [
        ...emojis.slice(0, emojiIndex),
        updateEmojiCount,
        ...emojis.slice(emojiIndex + 1),
      ];

      setReactions(newEmojis);

      await updateTopicReactions({
        id: Number(id),
        reactions: newEmojis,
      });
    }
  };

  const { data: comments } = useGetCommentsQuery({
    topic_id,
  });

  const handleUpdateTopic = () => {
    setShowUpdateTopic(true);
  };

  return (
    <div className={styles.topic}>
      <CssBaseline />
      <Container maxWidth="md" className={styles.container}>
        <h1>{topic?.name}</h1>
        <div className={styles.user}>
          {(topic?.author === userData?.display_name ||
            topic?.author === userData?.login) && (
            <StyledButton
              extendсlass={cn(styles.button, styles.btnUpdate)}
              onClick={handleUpdateTopic}>
              🖋️
            </StyledButton>
          )}
          {topic?.author}
        </div>
        {!showUpdateTopic && (
          <div className={styles.description}>{topic?.content}</div>
        )}
        {showUpdateTopic && (
          <UpdateTopic
            topic_id={topic_id}
            author={topic?.author}
            old_name={topic?.name}
            old_content={topic?.content}
            setShowUpdateTopic={setShowUpdateTopic}
          />
        )}
        <Emoji
          onEmojiClick={onEmojiClick}
          reactions={topic?.reactions || reactions}
        />
        <Divider className={styles.divider} />

        <WriteComment
          topic_id={topic_id}
          author={userData?.display_name ?? userData?.login ?? 'anonymous'}
          parent_id={null}
          depth={0}
        />
        {comments && (
          <div className={styles.comments}>
            <Comments
              topic_id={topic_id}
              children={comments}
            />
          </div>
        )}
      </Container>
    </div>
  );
}
