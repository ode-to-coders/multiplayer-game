import { Request, Response } from 'express';

import { UserTheme } from '../../db';
import { isMessageInError } from '../utils/is-message-in-error';


export const createUserTheme = async (req: Request, res: Response) => {
  const {
    ownerId,
    theme,
  } = req.body;

  if (!ownerId || !theme) {
    res.status(400).send({ message: 'user и theme обязательные параметры' });
  }

  try {
    const data = await UserTheme.create({ ownerId, theme });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при обновлении темы для пользователя',
    });
  }
}

export const updateUserTheme = async (req: Request, res: Response) => {
  const {
    ownerId,
    theme,
  } = req.body;

  if (!ownerId || !theme) {
    res.status(400).send({ message: 'user и theme обязательные параметры' });
  }

  try {
    const data = await UserTheme.update(
      { theme },
      {
        where: { ownerId },
      }
    );
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при обновлении темы для пользователя',
    });
  }
}

export const getUserTheme = async (req: Request, res: Response) => {
  const { ownerId } = req.params;
  console.log(ownerId, 'iddd@@@@@');

  try {
    const data = await UserTheme.findOne({
      where: { ownerId }
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при получении темы пользователя',
    });
  }
}
