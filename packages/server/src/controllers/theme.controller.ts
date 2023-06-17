import { Request, Response } from 'express';

import { Theme } from '../../db';
import { isMessageInError } from '../utils/is-message-in-error';


export const getTheme = async(_req: Request, res: Response) => {
  try {
    const data = await Theme.findAll();
    res.send(data);
    console.log(data, 'all');
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при получении темы',
    });
  }
}

export const createTheme = async(_req: Request, res: Response) => {
  try {
    const data = await Theme.create();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при создании темы',
    });
  }
}
