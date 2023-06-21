/// <reference lib="WebWorker" />
export type {};
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'v1';
const PATHS = [
  '/',
  '/login',
  '/registration',
  '/500',
  '/forum',
  '/topic',
  '/end',
  '/leaderboard',
  '/profile',
  '/profile/edit',
  '/profile/edit/password',
];

const addResourcesToCache = async (resources: any) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

const putInCache = async (request: Request, response: Response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

self.addEventListener('install', event => {
  event.waitUntil(addResourcesToCache(PATHS));
});

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', event => {
  event.waitUntil(enableNavigationPreload());
});

async function fetchRequest(request: Request) {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  const response = await fetch(request);

  if (response) {
    putInCache(request, response.clone());

    return response;
  }

  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

self.addEventListener('fetch', async event => {
  if (
    event.request.url.startsWith('chrome-extension') ||
    event.request.url.includes('extension')
  )
    return;
  event.respondWith(fetchRequest(event.request));
});
