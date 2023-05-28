import { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import Emoji from '../../components/Emoji';

import { useGetTopicsQuery, useUpdateReactionsMutation } from '../../app/store/api/topic/topicApi';

import { TopicT, Comment } from './types';

import styles from './index.module.scss';


export function TopicPage(props: TopicT) {
  const { topic } = props;

  const [emojis, updateEmojis] = useState<string[]>([]);
  const {
    data,
  } = useGetTopicsQuery();

  console.log(data, 'data');

  const { description, subject, user, comments } = topic;

  const onEmojiClick = async(symbol: string) => {
    updateEmojis([...emojis, symbol]);
    //   fetch('http://localhost:3001/api/topics/update', {
    //   method: 'PUT',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     id: 1,
    //     author: 'DDDD',
    //     name: 'TTTT',
    //     reactions: emojis,
    //   }),
    // });
  };

  // const test = async () => {
  //   fetch('http://localhost:3001/api/topics/create', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: 'first',
  //       author: 'Mark',
  //     }),
  //   });

  //   fetch('http://localhost:3001/api/topics/update', {
  //     method: 'PUT',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: 1,
  //       author: 'DDDD',
  //       name: 'TTTT',
  //       reactions: [],
  //     }),
  //   });

  //   fetch('http://localhost:3001/api/topics/delete/10', {
  //     method: 'DELETE',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   });

  //   fetch('http://localhost:3001/api/topics');
  // };

  // test();

  return (
    <div className={styles.topic}>
      <CssBaseline />
      <Container maxWidth="md" className={styles.container}>
        <h1>{subject}</h1>
        <div className={styles.user}>{user.name}</div>
        <div className={styles.description}>{description}</div>

        <Emoji onEmojiClick={onEmojiClick} />

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

