import { Request, Response } from 'express';

import { Topic } from '../../db';

export const createTopic = (req: Request, res: Response) => {
  const { name, author } = req.body;

  if (!name || !author) {
    return res
      .status(400)
      .send({ message: 'name и author обязательные параметры' });
  }

  return Topic.create({ name, author })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Произошла ошибка при создании темы',
      });
    });
};

export const getTopics = (_req: Request, res: Response) => {
  Topic.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Произошла ошибка при получении тем форума',
      });
    });
};

export const updateTopicReactions = (req: Request, res: Response) => {
  const { id, reactions } = req.body;

  Topic.update(
    { reactions },
    {
      where: { id },
    }
  )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Произошла ошибка при обновлении темы форума',
      });
    });
};
