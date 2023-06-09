import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  useGetServiceIdQuery,
  useSignInYandexMutation,
} from '../../../app/store/api/auth/authApi';

const getYandexAuthRedirectLink = ({ clientId }: { clientId: string }) =>
  `${__YANDEX_OAUTH_REDIRECT_PATH__}&client_id=${clientId}&redirect_uri=${__APP_PATH__}`;

export const useYandexSignIn = () => {
  const [signInYandex, { isError }] = useSignInYandexMutation();
  const [searchParams] = useSearchParams();

  const ref = useRef(0);

  const { data } = useGetServiceIdQuery({
    redirect_uri: encodeURIComponent(__APP_PATH__),
  });

  const authCode = searchParams.get('code');

  useEffect(() => {
    ref.current = ref.current + 1;
    if (authCode && authCode !== 'null' && !isError && ref.current < 2) {
      signInYandex({
        code: authCode,
        redirect_uri: __APP_PATH__,
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
