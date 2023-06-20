import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

export const proxyMiddleware = () =>
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: { '*': '' },
    target: 'https://ya-praktikum.tech',
    onError: error => {
      console.log('Error', error);
    },
    onProxyReq: fixRequestBody,
  });
