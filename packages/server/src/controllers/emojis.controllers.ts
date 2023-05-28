import { Request, Response } from 'express';

import { Emojis } from '../../db';

export const updateTopicReactions = (req: Request, res: Response) => {
  const { id, reactions } = req.body;

  Emojis.update(
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
        message:
          err.message || 'Произошла ошибка при обновлении реакций темы форума',
      });
    });
};
