import { Request, Response } from 'express';

import { Topic } from '../../db';

export const createTopic = (req: Request, res: Response) => {
  console.log('Create topic', req, res);
  // return Topic.create();
};

export const getTopics = (_req: Request, res: Response) => {
  Topic.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Произошла ошибка при получении тем форума',
      });
    });;
};
