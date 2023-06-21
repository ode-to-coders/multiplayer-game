import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket from 'ws';
import { createServer as createViteServer } from 'vite';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import type { ViteDevServer } from 'vite';
import { getWinnerEnthourage } from './src/utils/winner';
import { getRandom } from './src/utils/randomPair';

dotenv.config();

import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
// import * as cookieParser from 'cookie-parser';

dotenv.config();

import { dbConnect } from './db';
import routes from './src/routes/routes';

import {
  resultType,
  requestType,
  clientType,
  gamesType,
  userAnswerType,
}  from './types';
import { proxyMiddleware } from './src/middlewares/proxy.middleware';
// import { authMiddleware } from './src/middlewares/auth.middleware';
// import { csp } from './src/middlewares';


const games: gamesType = {};

let userAnswers: userAnswerType[];
let winEntourage = '';

export const app = express();

const countSecret = Array.from(Array(14).keys());

function start() {
  dbConnect().then(res => console.log('res', res));

  const wss = new WebSocket.Server({ port: 3002 }, () => {
    console.log('WebSocket server started');
  });

  wss.on('connection', (wsClient: clientType) => {
    wsClient.on('message', async message => {
      const request = JSON.parse(message.toString());
      if (request.event === 'logout') {
        wsClient.close();
        games[request.payload.gameId] = games[request.payload.gameId].filter(
          wsc => wsc.login !== request.payload.login
        );
      }
      if (request.event === 'connect') {
        wsClient.login = request.payload.login;
        initGame(wsClient, request.payload.gameId);
      }
      broadcast(request);
    });
  });

  function initGame(ws: clientType, gameId: string) {
    if (!games[gameId]) {
      games[gameId] = [ws];
    }
    if (games[gameId] && games[gameId]?.length < 4) {
      games[gameId] = games[gameId].filter(wsc => wsc.login !== ws.login);
      games[gameId] = [...games[gameId], ws];

      userAnswers = games[gameId].map((client, i) => {
        return {
          login: client.login,
          id: i,
          entourage: '',
          profession: '',
          secret: '',
          answers: '',
          votes: [],
          randomPair: [0, 1],
          finalVotes: [],
          score: 0,
        }
      });
    }
    if (games[gameId] && games[gameId]?.length === 4) {
      games[gameId] = games[gameId].filter(wsc => wsc.login !== ws.login);
    }
  }


  function broadcast(params: requestType) {
    let result: resultType;

    const {
      gameId,
      login
    } = params.payload as requestType;

    games[gameId].forEach((client: clientType) => {
      const rivals = games[gameId]
      .filter((user: clientType) => user.login !== login)
      ?.map(user => user.login);

      switch (params.event) {
        case 'connect': {
          result = {
            type: 'connectToPlay',
            payload: {
              success: true,
              rivalName: rivals,
              login: client.login,
              count: games[gameId].length,
            },
          };
          break;
        }

        case 'ready': {
          result = {
            type: 'readyToPlay',
            payload: {
              canStart: games[gameId].length > 1,
              login: client.login,
              count: games[gameId].length,
              rivalName: rivals,
            },
          };
          break;
        }

        case 'winEntourage': {
          const currentUserIndex = userAnswers.findIndex((member: userAnswerType) => member.login === login);
          const randomPair = getRandom(countSecret, 2);

          const currentUserAnswer = {
            ...userAnswers[currentUserIndex],
            randomPair,
            ...params.payload.answers,
          };

          userAnswers = [
            ...userAnswers.slice(0, currentUserIndex),
            currentUserAnswer,
            ...userAnswers.slice(currentUserIndex + 1)
          ];

          const isVoted = userAnswers.every((userAnswer: userAnswerType) => userAnswer.entourage !== '');

          if (isVoted) {
            winEntourage = getWinnerEnthourage(userAnswers).name;

            result = {
              type: 'passWinEntourage',
              payload: {
                login,
                userAnswers,
                winEntourage,
                rivalName: rivals,
                count: games[gameId].length,
              },
            }
          }
          break;
        }

        case 'showAnswer': {
          const isVoted = userAnswers.every((userAnswer: userAnswerType) => userAnswer.answers !== '');

          if (isVoted) {
            result = {
              type: 'answersOnQuestion',
              payload: {
                userAnswers,
                login,
              },
            };
          }
          break;
        }

        case 'game': {
          const currentUserIndex = userAnswers.findIndex((member: userAnswerType) => member.login === login);

          const currentUserAnswer = {
            ...userAnswers[currentUserIndex],
            ...params.payload.answers,
          };

          userAnswers = [
            ...userAnswers.slice(0, currentUserIndex),
            currentUserAnswer,
            ...userAnswers.slice(currentUserIndex + 1)
          ];

          result = {
            type: 'play',
            payload: {
              login,
              userAnswers,
              rivalName: rivals,
            },
          };

          break;
        }

        case 'checkAnswer': {
          result = {
            type: 'lastScene',
            payload: {
              userAnswers,
            },
          };
          break;
        }

        default:
          result = {
            type: 'logout',
            payload: {
              rivalName: games[gameId]
                .filter((user: clientType) => user.login !== client.login)
                ?.map(user => user.login),
              login: client.login,
              count: games[gameId].length,
            },
          };
          break;
      }
      client.send(JSON.stringify(result));
    });
  }
}
const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use(cookieParser.default());

  /**
   * Проксируем основные ручки яндекса
   */
  app.use('/api/v2', proxyMiddleware());
  /**
   * Проверка авторизации для кастомных ручек
   */
  
  // app.use('/api/topics', authMiddleware);
  // app.use('/api/comments', authMiddleware);

  // app.use(csp());

  const port = Number(process.env.SERVER_PORT) || 3001;

  let distPath = '';
  let srcPath = '';
  let ssrClientPath = '';

  let vite: ViteDevServer | undefined;

  if (isDev) {
    srcPath = path.dirname(require.resolve('client'));
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    distPath = path.dirname(require.resolve('../../client/dist/index.html'));

    ssrClientPath = require.resolve('../../client/ssr-dist/client.cjs');
  }

  routes(app);

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  if (!isDev) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );
        template = await vite!.transformIndexHtml(url, template);
      }

      let render: (url: string, cache: any) => Promise<string>;
      let store: { getState: () => unknown };

      if (!isDev) {
        render = (await import(ssrClientPath)).render;
        store = (await import(ssrClientPath)).store;
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
        store = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .store;
      }

      const appStore = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
        store.getState()
      )}</script>`;

      const cache = createCache({ key: 'css' });

      const { extractCriticalToChunks, constructStyleTagsFromChunks } =
        createEmotionServer(cache);

      const appHtml = await render(url, cache);

      const emotionChunks = extractCriticalToChunks(appHtml);
      const emotionCss = constructStyleTagsFromChunks(emotionChunks);

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--ssr-store-->', appStore)
        .replace('<!--ssr-style-->', emotionCss);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();
start();
