import { SELF, NONE, NONCE, INLINE, expressCspHeader } from 'express-csp-header';

export const csp = () => {

  return expressCspHeader({
    directives: {
      'default-src': [
        SELF,
        'http://localhost/',
        'ws://localhost:24678',
        'https://ya-praktikum.tech/api/v2/',
        'https://fonts.gstatic.com/s/inter/v12/'
      ],
      'media-src': [SELF],
      'style-src': [SELF, NONCE],
      'script-src': [SELF, INLINE],
      'object-src': [NONE],
      'child-src': [SELF, 'https://www.youtube.com'],
      'form-action': [SELF]
    }
  })
}
