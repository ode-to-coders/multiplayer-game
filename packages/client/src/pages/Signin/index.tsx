import { AuthForm } from '../../features/AuthForm/index';

import s from './index.module.scss';
import { StyledButton } from '../../shared/ui/Styled';
import { useYandexSignIn } from './hooks/useYandexSignIn';
import { CustomNotification } from '../../shared/ui/CustomNotification/CustomNotification';

export const Signin = () => {
  const { yandexRedirect, isError } = useYandexSignIn();

  return (
    <div className={s.wrapCont}>
      <AuthForm>
        <StyledButton onClick={yandexRedirect}>Войти через Яндекс</StyledButton>
      </AuthForm>
      <CustomNotification isUninitialized={!isError} isError={isError} />
    </div>
  );
};
