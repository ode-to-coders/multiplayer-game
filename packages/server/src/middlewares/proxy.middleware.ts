import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

import { YA_BASE_URL } from '../utils/constants';

export const proxyMiddleware = () =>
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: { '*': '' },
    target: YA_BASE_URL,
    onError: error => {
      console.log('Error', error);
    },
    onProxyReq: fixRequestBody,
  });
