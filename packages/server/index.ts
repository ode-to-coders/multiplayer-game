import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket from 'ws';

dotenv.config();

import express from 'express';
import { createClientAndConnect } from './db';

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

type payloadType = {
  success: boolean;
  rivalName: string;
  login: string;
  gameId?: string;
};

type resultType = {
  type: string;
  payload: payloadType;
};

type requestType = {
  event: string;
  gameId: string;
  payload: payloadType;
};

type clientType = {
  login: string;
} & WebSocket;

type gamesType = Record<string, Array<clientType>>;

const games: gamesType = {};

function start() {
  const wss = new WebSocket.Server({ port: 3002 }, () => {
    console.log('WebSocket server started');
  });

  wss.on('connection', (wsClient: clientType) => {
    wsClient.on('message', async message => {
      const request = JSON.parse(message.toString());
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
      games[gameId] = [...games[gameId], ws];
    }
    if (games[gameId] && games[gameId]?.length === 4) {
      games[gameId] = games[gameId].filter(wsc => wsc.login !== wsc.login);
    }
  }

  function broadcast(params: requestType) {
    let result: resultType;

    const { gameId } = params.payload;

    games[gameId as string].forEach((client: clientType) => {
      switch (params.event) {
        case 'connect':
          result = {
            type: 'connectToPlay',
            payload: {
              success: true,
              rivalName: games[gameId as string].find(
                (user: clientType) => user.login !== client.login
              )?.login as string,
              login: client.login,
            },
          };
          break;
        default:
          result = { type: 'logout', payload: params.payload };
          break;
      }
      client.send(JSON.stringify(result));
    });
  }
}

start();
