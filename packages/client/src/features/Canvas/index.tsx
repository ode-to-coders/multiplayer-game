import { RefObject, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { EndPage } from '../../pages/EndPage/EndPage';
import { ws } from '../../pages/StartPage/StartPage';

import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';

import { isOpen } from '../../shared/utils/helpers';
import subarray from './utils/subarrays';

import gameData from '../../mocks/gameData.json';

import { CanvasScenes } from './canvasScenes';
import { ssd } from './storeSessionData';
import { GAMESCENES } from './const';
import { TCardQuestion, userAnswerType } from './types';

import s from './index.module.scss';
import { Header } from './features';

const mockFiveAnswers: TCardQuestion[] = [
  {type: 'black', index: 0},
  {type: 'england', index: 1},
  {type: 'modern', index: 2},
  {type: 'black', index: 5},
  {type: 'fantasy', index: 2},
]

import { EndPage } from '../../pages/EndPage/EndPage';


// TODO в будущем при запуске.. внести в компонент и динамически решать какие нужны размеры взависимости от экрана клиента
const canvasSize = {width: 1280  , height: 768};

export const Canvas = () => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [scene, setScene] = useState(0);
  const [showModalResult, setShowModalResult] = useState(false);
  const [frameRender, goFrameRender] = useState<number>(1);
  const [userRatings, setUserRatings] = useState<userAnswerType[]>([]);

  const { gameId } = useParams();
  const { data } = useGetUserInfoQuery();

  const handleChoose = useCallback((type: string, vote: any, key: string) => {
    if (isOpen(ws)) {
      ws.send(
        JSON.stringify({
          event: type,
          payload: {
            gameId,
            login: data?.login,
            answers: {
              [key]: vote
            },
          }
        })
      );
    }
  }, [gameId, data]);

  const handleShowAnswer = useCallback(() => {
    if (isOpen(ws)) {
      ws.send(
        JSON.stringify({
          event: 'showAnswer',
          payload: {
            gameId,
            login: data?.login,
          }
        })
      );
    }
  }, [gameId, data]);

  const handleCheckAnswers = useCallback(() => {
    if (isOpen(ws)) {
      ws.send(
        JSON.stringify({
          event: 'checkAnswer',
          payload: {
            gameId,
            login: data?.login,
            gameData,
          }
        })
      );
    }
  }, [gameId, data]);

  ws.onmessage = function (response: any) {
    const { type, payload } = JSON.parse(response.data);
    console.log(payload);

    switch (type) {
      case 'play': {
        break;
      }

      case 'passWinEntourage': {
        const {
          winEntourage,
          rivalName,
          login,
          userAnswers,
          count,
        } = payload;

        ssd.mainGamer.entourage = winEntourage;

        // Todo: не работает
        if (winEntourage === 'england') {
          ssd.mainGamer.nameEntourage = 'Викторианская Англия'
        } else if (winEntourage === 'modern') {
          ssd.mainGamer.nameEntourage = 'Современность'
        } else if (winEntourage === 'fantasy') {
          ssd.mainGamer.nameEntourage = 'Фэнтези'
        }

        const numsVoicesWinEntourage = userAnswers.reduce((acc: number, userAnser: userAnswerType) => { 
          if (userAnser.entourage === winEntourage) {
            acc = acc + 1;
          }
          return acc;
        }, 0)

        ssd.mainGamer.numsRivals = count;
        ssd.mainGamer.numsVoicesWinEntourage = numsVoicesWinEntourage;
        ssd.mainGamer.namesRivals = rivalName;
        const currentUserIndex = userAnswers.findIndex((member: userAnswerType) => member.login === login);
        const randomPair =userAnswers[currentUserIndex].randomPair || [0, 1];
        ssd.cardsForSelect = {
          prof: randomPair,
          secret: randomPair
        }

        mockFiveAnswers.forEach((answer, index) => {
          ssd.dataFiveQuestions[index] = {open: false, ...answer}
        });

        ssd.dataFiveQuestions
        for (let i = 0; i < 8; i++) { // разворачиваем 8 массивчиков для отрисовки и возможности заполнять блокнот в след сценах
          ssd.mainGamer.notes.push(new Array(ssd.mainGamer.numsRivals*2))
        }

        if (ssd.mainGamer.entourage) {
          setScene(GAMESCENES.winEntourage);
        }
        break;
      }

      case 'answersOnQuestion': {
        const {
          userAnswers,
        } = payload;

        const rivalsAnswer = userAnswers.filter((userAnswer: userAnswerType) => userAnswer.login !== data?.login);

        const answers = rivalsAnswer.reduce((acc: any, user: userAnswerType) => {
          acc[user.login] = user.answers;
          return acc;
        }, {});

        ssd.answersOfGamers = answers;
        setScene(GAMESCENES.gamersAnswers);
        break;
      }

      case 'lastScene': {
        const {
          userAnswers,
        } = payload;

        const rivalsAnswer = userAnswers.filter((userAnswer: userAnswerType) => userAnswer.login !== data?.login);
        const currentUserIndex = userAnswers.findIndex((member: userAnswerType) => member.login === data?.login);
        const currentUser = userAnswers[currentUserIndex];
        const subFinalResult = subarray(2, currentUser.finalVotes);

        const finalResult = rivalsAnswer.reduce((acc: boolean[], rival: userAnswerType, index: number) => {
          const rivalSecret = rival.secret
          const rivalProf = rival.profession;

          const answerForCurrentRival = subFinalResult[index];
          const answerForCurrentRivalProf = gameData[0][ssd.mainGamer.entourage].profession[answerForCurrentRival[0] - 1];
          const answerForCurrentRivalSecret = gameData[0][ssd.mainGamer.entourage].secret[answerForCurrentRival[1] - 1];

          if (answerForCurrentRivalProf === rivalProf) {
            acc.push(true);
            currentUser.score = currentUser.score + 1;
          } else {
            acc.push(false);
          }

          if (answerForCurrentRivalSecret === rivalSecret) {
            acc.push(true);
            currentUser.score = currentUser.score + 1;
          } else {
            acc.push(false);
          }
          return acc;
        }, []);

        finalResult.forEach((check: boolean, index: number) => {
          ssd.mainGamer.notes[6][index] = check ? '✔' : '✖'
        });

        const profs: boolean[] = [];
        const secrets: boolean[] = [];

        rivalsAnswer.forEach((userAnswer: userAnswerType, index: number) => {
          const subFinalRivals = subarray(2, userAnswer.finalVotes);

          const answerForCurrentRival = subFinalRivals[index];
          const rivalAnswerProf = gameData[0][ssd.mainGamer.entourage].profession[answerForCurrentRival[0] - 1];
          const rivalAnswerSecret = gameData[0][ssd.mainGamer.entourage].secret[answerForCurrentRival[1] - 1];

          if(currentUser.secret === rivalAnswerSecret) {
            secrets.push(true);
            userAnswer.score = userAnswer.score + 1;
          } else {
            secrets.push(false);
          }

          if(currentUser.profession === rivalAnswerProf) {
            profs.push(true);
            userAnswer.score = userAnswer.score + 1;
          } else {
            profs.push(false);
          }
        });

        const empty = new Array(5 - profs.length).fill(null, 0, 5 - profs.length);

        const rivalsResult = [
          ...profs,
          ...empty,
          ...secrets,
          ...empty,
        ];

        console.log(rivalsAnswer, 'rivalsAns');

        rivalsResult.forEach((check, index) => {
          ssd.mainGamer.notes[7][index] =
            check 
            ? '✔'
            : check === false
              ? '✖'
              : ''
        });

        setUserRatings(userAnswers);

        setScene(GAMESCENES.finalResult);
        break;
      }

      default:
        break;
    }
  };

  const canvasScenes = useMemo(() => {
    return new CanvasScenes(
      setScene,
      setShowModalResult,
      goFrameRender,
      {width: canvasSize.width, height: canvasSize.height},
      handleChoose,
      handleShowAnswer,
      handleCheckAnswers,
    );
  }, []);

  // основная логика отрисовки здесь
  useEffect(() => {
    let frameId: number | null = null;
    let next = false; // нужен ли следующий кадр?
    
    const animation = () => { 
      if(!canvasRef.current) {
        // Компонент был размонтирован
        return;
      }

      // запуск!
      next = canvasScenes.startGame(canvasRef.current, scene);
      
      if (next) {
        frameId = window.requestAnimationFrame(animation);
      } else {
        if (frameId !== null) {
          window.cancelAnimationFrame(frameId);
          frameId = null;
        }
      }
    }

    animation()
  
    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    };
  }, [canvasRef.current, scene, frameRender]);

  return (
    <div>
      <div className={s.wrapCont}>
        <div className={s.contCanvas}>
          <canvas
            ref={canvasRef}
            className={s.canvas}
            width={canvasSize.width}
            height={canvasSize.height}
          />
          {scene > 0 && 
            <Header
              canvasScenes={canvasScenes}
              scene={scene}
              canvasSize={canvasSize}
            />
          }
        </div>
      </div>
      {showModalResult && <EndPage ratings={userRatings} />}
    </div>
  )
}
