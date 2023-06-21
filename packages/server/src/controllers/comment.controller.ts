import { Request, Response } from 'express';

import { Comment, Topic, sequelize } from '../../db';
import { isMessageInError } from '../utils/is-message-in-error';
import { getNestedComments } from '../utils/get-comments';
import { IComment } from '../models/comment.model';

export const createComment = async (req: Request, res: Response) => {
  const { topic_id, author, content, parent_id, depth, author_avatar } =
    req.body;

  if (!topic_id || !author || !content) {
    res
      .status(400)
      .send({ message: 'name и author и content обязательные параметры' });
  }

  try {
    const data = await Comment.create({
      topic_id,
      author,
      author_avatar,
      content,
      parent_id,
      depth,
    });

    await Topic.update(
      { comments_count: sequelize.literal('comments_count + 1') },
      { where: { id: topic_id } }
    );

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
  const { topicId: topic_id } = req.params;

  try {
    const data = await Comment.findAll({
      where: { topic_id },
    });
    //@ts-ignore
    const actualData = getNestedComments(data as IComment[], Number(topic_id));

    res.send(actualData);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при получении комментариев',
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id, topicId } = req.params;

  if (!id || !topicId) {
    res
      .status(400)
      .send({ message: 'id и topicId должны присутствовать в queryParams' });
  }

  try {
    await Comment.destroy({
      where: { id },
    });

    await Topic.update(
      { comments_count: sequelize.literal('comments_count - 1') },
      { where: { id: topicId } }
    );

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
  const { topic_id, author, content, parent_id, depth, id, author_avatar } =
    req.body;

  try {
    const data = await Comment.update(
      { topic_id, author, content, parent_id, depth, author_avatar },
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
