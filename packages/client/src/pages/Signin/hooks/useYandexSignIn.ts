import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  useGetServiceIdQuery,
  useSignInYandexMutation,
} from '../../../app/store/api/auth/authApi';

// Пока захардкодил чтобы можно было проверить на рендере
// В дальнейшем будут браться с env
// TODO localhost only for local test
const OAUTH_REDIRECT_API_PATH =
  'https://oauth.yandex.ru/authorize?response_type=code';
// const APP_PATH = 'https://multiplayer-game-6e3r.onrender.com/';
const APP_PATH = 'http://localhost:3000';

const getYandexAuthRedirectLink = ({ clientId }: { clientId: string }) =>
  `${OAUTH_REDIRECT_API_PATH}&client_id=${clientId}&redirect_uri=${APP_PATH}`;

export const useYandexSignIn = () => {
  const [signInYandex, { isError }] = useSignInYandexMutation();
  const [searchParams] = useSearchParams();

  const { data } = useGetServiceIdQuery({
    redirect_uri: encodeURIComponent(APP_PATH),
  });

  const authCode = searchParams.get('code');

  useEffect(() => {
    if (authCode && authCode !== 'null' && !isError) {
      signInYandex({
        code: authCode,
        redirect_uri: APP_PATH,
      });
    }
  }, [authCode]);

  const yandexRedirect = useCallback(() => {
    data?.service_id &&
      window.open(
        getYandexAuthRedirectLink({ clientId: data?.service_id }),
        '_self'
      );
  }, [data?.service_id]);

  return {
    yandexRedirect,
    isError,
  };
};
