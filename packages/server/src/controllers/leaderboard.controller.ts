import { Request, Response } from 'express';

import { Leaderboard } from '../../db';
import { isMessageInError } from '../utils/is-message-in-error';
import { ILeaderboard } from '../models/leaderboard.model';

export const pushResult = async (req: Request, res: Response) => {
  const { gamer, resultGame, points, idUser, avatar } = req.body;

  if (resultGame === undefined || points === undefined || !idUser === undefined) {
    res
      .status(400)
      .send({ message: 'idUser, resultGame, points: обязательные параметры' });
  }

  try {
    const dataGamer = await Leaderboard.findOne({
      where: { id: idUser } 
    }) as ILeaderboard | null;

    if (!dataGamer) {
      
      await Leaderboard.create({
        id: idUser,
        avatar: avatar,
        gamer: gamer ?? 'аноним',
        winGames: resultGame ? 1 : 0,
        allGames: 1,
        winPercent: resultGame ? 100 : 0,
        points
      });
    } else {
      const winGames = resultGame ? dataGamer.winGames + 1 : dataGamer.winGames;
      const allGames = dataGamer.allGames + 1;
      const winPercent = Math.round((winGames / allGames) * 100);
      await Leaderboard.update(
        {
          avatar: avatar,
          gamer: gamer ?? 'аноним',
          winGames,
          allGames,
          winPercent,
          points: dataGamer.points + points
        },
        { where: { id: dataGamer.id } }
      )
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при добавлении результата в рейтинг игроков',
    });
  }
};

export const getLeaderboard = async (_req: Request, res: Response) => {

  try {
    const data = await Leaderboard.findAll();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: isMessageInError(err)
        ? err?.message
        : 'Произошла ошибка при получении результатов Рейтинга',
    });
  }
};
