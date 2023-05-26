import { Request, Response } from 'express';

import { Comment } from '../../db';

export const createComment = (req: Request, res: Response) => {
  const { topic_id, author, content, parent_id } = req.body;

  if (!topic_id || !author || !content) {
    return res
      .status(400)
      .send({ message: 'name и author и content обязательные параметры' });
  }

  return Comment.create({ topic_id, author, content, parent_id })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Произошла ошибка при создании комментария',
      });
    });
};

// export const getComments = (_req: Request, res: Response) => {};
