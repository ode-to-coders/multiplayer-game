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

          {comments.map((comment: Comment) => (
            <Box className={styles.comment}>
              <Avatar />
              <Box className={styles.info}>
                {comment.user}
                comment.text
              </Box>
            </Box>
          ))}
      </Container>
    </div>
  );
}

export default Topic;
