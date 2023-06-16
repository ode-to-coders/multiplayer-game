import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

const { YANDEX_BASE_URL } = process.env;

export const proxyMiddleware = () =>
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: { '*': '' },
    target: YANDEX_BASE_URL,
    onError: error => {
      console.log('Error', error);
    },
    onProxyReq: fixRequestBody,
  });
