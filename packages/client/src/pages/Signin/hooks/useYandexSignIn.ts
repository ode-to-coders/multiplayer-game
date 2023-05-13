import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  useGetServiceIdQuery,
  useSignInYandexMutation,
} from '../../../app/store/api/auth/authApi';

const OAUTH_REDIRECT_API_PATH =
  'https://oauth.yandex.ru/authorize?response_type=code';
const APP_PATH = 'https://multiplayer-game-6e3r.onrender.com/';

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
    if (authCode && !isError) {
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
