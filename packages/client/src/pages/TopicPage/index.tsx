import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { StyledButton } from '../../shared/ui/Styled';
import cn from 'classnames';

import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { sanitize } from '../../shared/utils/sanitize';

import { UpdateTopic, UpdateComment, WriteComment } from './features';

import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useGetTopicsQuery,
  useUpdateReactionsMutation,
} from '../../app/store/api/forum/forumApi';
import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';

import Emoji from '../../components/Emoji';

import { TEmoji } from './types';

import { IComment } from '../../app/store/api/forum/types';

import styles from './index.module.scss';

export function TopicPage() {
  const { data: userData } = useGetUserInfoQuery();
  const { data } = useGetTopicsQuery();
  const { id } = useParams();
  const topic_id = Number(id);
  const [updateCommentId, setUpdateCommentId] = useState(-1);
  const [showUpdateTopic, setShowUpdateTopic] = useState(false);

  const [updateTopicReactions] = useUpdateReactionsMutation();

  const topic = useMemo(() => {
    return data?.find((topic: any) => topic.id === Number(id));
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
  const [deleteComment] = useDeleteCommentMutation();

  const handleUpdateTopic = () => {
    setShowUpdateTopic(true);
  };

  const handleDeleteComment = (id: number, topicId: number) => {
    deleteComment({ id, topicId });
  };

  const handleUpdateComment = (idComment: number) => {
    setUpdateCommentId(idComment);
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
        />
        {comments?.map((comment: IComment, index: number) => (
          <div key={index}>
            <Box className={styles.comment}>
              <Avatar
                src={`https://ya-praktikum.tech/api/v2/resources${userData?.avatar}`}
              />
              <Box className={styles.info}>
                <div className={styles.username}
                  dangerouslySetInnerHTML={{ __html: sanitize( comment.author ) } }
                />
                <div className={styles.text}
                  dangerouslySetInnerHTML={{ __html: sanitize( comment.content ) } }
                />
              </Box>
            </Box>
            {(comment.author === userData?.display_name ||
              comment.author === userData?.login) && (
              <Box className={styles.comment__setup}>
                <StyledButton
                  extendсlass={cn(styles.button, styles.btnDelete)}
                  onClick={() =>
                    handleDeleteComment(comment.id, Number(topic?.id))
                  }>
                  ✖
                </StyledButton>
                <StyledButton
                  extendсlass={cn(styles.button, styles.btnUpdate)}
                  onClick={() => handleUpdateComment(comment.id)}>
                  🖋️
                </StyledButton>
              </Box>
            )}
            {comment.id === updateCommentId && (
              <UpdateComment
                comment_id={comment.id}
                topic_id={topic_id}
                author={comment.author}
                old_content={comment.content}
                setUpdateCommentId={setUpdateCommentId}
              />
            )}
          </div>
        ))}
      </Container>
    </div>
  );
}
