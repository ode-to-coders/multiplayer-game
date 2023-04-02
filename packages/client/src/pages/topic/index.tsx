import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { TopicT, Comment } from './types';

import styles from './index.module.scss';

function Topic(props: TopicT) {
  const {
    topic
  } = props;

  if (!topic) return null;

  const {
    description,
    subject,
    user,
    comments,
  } = topic;

  return (
    <div className={styles.topic}>
      <CssBaseline />
        <Container maxWidth="md" className={styles.container}>
          <h1>{subject}</h1>
          <div className={styles.user}>{user.name}</div>
          <div className={styles.description}>{description}</div>
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

export default Topic;
