import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket from 'ws';

import express from 'express';
import { createClientAndConnect } from './db';

import type {
  gamesType,
  clientType,
  requestType,
  resultType,
} from './types';

dotenv.config();

const app = express();
app.use(cors());

const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});

const games: gamesType = {};

function start() {
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
    }
    if (games[gameId] && games[gameId]?.length === 4) {
      games[gameId] = games[gameId].filter(wsc => wsc.login !== ws.login);
    }
  }

  function broadcast(params: requestType) {
    let result: resultType;

    const { gameId } = params.payload as requestType;

    games[gameId].forEach((client: clientType) => {
      switch (params.event) {
        case 'connect':
          result = {
            type: 'connectToPlay',
            payload: {
              success: true,
              rivalName: games[gameId]
                .filter((user: clientType) => user.login !== client.login)
                ?.map(user => user.login),
                login: client.login,
                count: games[gameId].length,
            },
          };
          break;

        case 'ready':
          result = {
            type: 'readyToPlay',
            payload: {
              canStart: games[gameId].length > 0,
              login: client.login,
              count: games[gameId].length,
              rivalName: games[gameId]
                .filter((user: clientType) => user.login !== client.login)
                ?.map(user => user.login),
            },
          };
          break;

        case 'chooseEnthourage':
          result = {
            type: 'selectedEnthourage',
            payload: {
              vote: params.payload.vote,
              login: params.payload.login,
            },
          };
          break;

        case 'chooseProfession':
          result = {
            type: 'selectedProfession',
            payload: {
              vote: params.payload.profession,
              login: params.payload.login,
            },
          };
          break;

        case 'choiceSecret':
          result = {
            type: 'selectedSecret',
            payload: {
              vote: params.payload.secret,
              login: params.payload.login,
            },
          };
          break;

        default:
          result = {
            type: 'logout',
            payload: {
              rivalName: games[gameId]
                .filter((user: clientType) => user.login !== client.login)
                ?.map(user => user.login),
              count: games[gameId].length,
            },
          };
          break;
      }
      client.send(JSON.stringify(result));
    });
  }
}

start();
