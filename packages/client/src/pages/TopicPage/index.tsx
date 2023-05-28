import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { TopicT, Comment } from './types';

import styles from './index.module.scss';

import { useParams } from 'react-router-dom';
import { useGetTopicsQuery } from '../../app/store/api/forum/forumApi';
import { useMemo } from 'react';

export function TopicPage(props: TopicT) {
  const { topic: topicMock } = props;

  
  const { description, subject, user, comments } = topicMock;
  
  
  const { data, isError, isLoading } = useGetTopicsQuery();
  const { id } = useParams();
  const topic = useMemo(() => {
    return data?.find(topic => topic.id === Number(id))
  }, [data])

  if (!topic) return null;
  
  return (
    <div className={styles.topic}>
      <CssBaseline />
      <Container maxWidth="md" className={styles.container}>
        <h1>{topic.name}</h1>
        <div className={styles.user}>{topic.author}</div>
        <div className={styles.description}>{topic.content}</div>
        <Divider className={styles.divider} />
        {comments.map((comment: Comment, index: number) => (
          <Box className={styles.comment} key={index}>
            <Avatar />
            <Box className={styles.info}>
              <div className={styles.username}>{comment.user}</div>
              <div className={styles.text}>{comment.text}</div>
            </Box>
          </Box>
        ))}
      </Container>
    </div>
  );
}
