import { Request, Response } from 'express';

import { Topic } from '../../db';

export const createTopic = (req: Request, res: Response) => {
  const { name, owner_name } = req.body;

  if (!name || !owner_name) {
    return res
      .status(400)
      .send({ message: 'name/owner_name обязательные параметры' });
  }
  return res.send(200);
  // return Topic.create();
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
