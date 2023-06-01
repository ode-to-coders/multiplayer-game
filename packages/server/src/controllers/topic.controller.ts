import { Request, Response } from 'express';

import { Topic } from '../../db';
import { isMessageInError } from '../utils/is-message-in-error';

export const createTopic = async (req: Request, res: Response) => {
  const { name, author, content } = req.body;

  if (!name || !author) {
    res.status(400).send({ message: 'name и author обязательные параметры' });
  }

  try {
    const data = await Topic.create({ name, author, content });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при создании темы',
    });
  }
};

export const getTopics = async (_req: Request, res: Response) => {
  try {
    const data = await Topic.findAll();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при получении тем форума',
    });
  }
};

export const updateTopic = async (req: Request, res: Response) => {
  const { name, author, reactions, content, id } = req.body;

  try {
    const data = await Topic.update(
      { name, author, reactions, content },
      {
        where: { id },
      }
    );

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при обновлении темы форума',
    });
  }
};

export const updateTopicReactions = async (req: Request, res: Response) => {
  const { id, reactions } = req.body;

  try {
    const data = await Topic.update(
      { reactions },
      {
        where: { id },
      }
    );

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при обновлении реакций темы форума',
    });
  }
};

export const deleteTopic = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Topic.destroy({
      where: { id },
    });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при удалении топика',
    });
  }
};
