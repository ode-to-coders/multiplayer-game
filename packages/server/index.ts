import dotenv from 'dotenv';
import cors from 'cors';
import WebSocket from 'ws';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';

dotenv.config();

import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
// import { createClientAndConnect } from './db';

// createClientAndConnect();

type payloadType = {
  success?: boolean;
  rivalName?: Array<string>;
  login?: string;
  gameId?: string;
  canStart?: boolean;
  count?: number;
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
              canStart: games[gameId].length > 3,
              login: client.login,
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
const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)');
  });

  //createClientAndConnect(); // подключение к БД
  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;

      if (!isDev()) {
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

      let render: (url: string) => Promise<string>;

      if (!isDev()) {
        render = (await import(ssrClientPath)).render;
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render;
      }

      const appHtml = await render(url);

      const html = template.replace('<!--ssr-outlet-->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev()) {
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
