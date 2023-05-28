import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTopicMutation } from '../../app/store/api/forum/forumApi';

import { StyledButton } from '../../shared/ui/Styled';

import styles from './index.module.scss';

import { PAGES } from '../../app/lib/routes.types';

type TProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  author: string;
}

export const CreateTopic = (props: TProps) => {
  const { setModal, author } = props;
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');  
  const [ createTopic ] = useCreateTopicMutation();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createTopic({
        name: name,
        author: author,
        content: content
      });
      if ('error' in response) {
        console.log(response.error);
        setModal(false);
      } else {
        setName('');
        setContent('');
        const PATH = PAGES.TOPIC.replace(':id', response.data.id.toString());
        navigate(PATH)
      }
    } catch (error) {
      console.log(error)
      setModal(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.wrap}
      autoComplete='off' 
    >
      <div>
        <label htmlFor="name">
          Название
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleName}
          required
          className={styles.inputName}
        />
      </div>
      <div>
        <label htmlFor="content">
          Текст
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContent}
          required
          className={styles.content}
        />
      </div>
      <StyledButton type="submit" extendсlass={styles.btnSubmit}>
        Создать тему
      </StyledButton>
    </form>
  );
};
