import { Request, Response } from 'express';

import { Comment } from '../../db';
import { isMessageInError } from '../utils/is-message-in-error';

export const createComment = async (req: Request, res: Response) => {
  const { topic_id, author, content, parent_id, depth } = req.body;

  if (!topic_id || !author || !content) {
    res
      .status(400)
      .send({ message: 'name и author и content обязательные параметры' });
  }

  try {
    const data = await Comment.create({
      topic_id,
      author,
      content,
      parent_id,
      depth,
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при создании комментария',
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const { depth, topicId: topic_id } = req.params;

  try {
    const data = await Comment.findAll({
      where: { topic_id, depth },
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при получении комментариев',
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Comment.destroy({
      where: { id },
    });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при удалении комментария',
    });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { topic_id, author, content, parent_id, depth, id } = req.body;

  try {
    const data = await Comment.update(
      { topic_id, author, content, parent_id, depth },
      {
        where: { id },
      }
    );

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при обновлении комментария',
    });
  }
};
