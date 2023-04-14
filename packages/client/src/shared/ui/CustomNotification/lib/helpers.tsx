import { ReactComponent as Error } from 'app/assets/svg/notification_error.svg';
import { ReactComponent as Loading } from 'app/assets/svg/notification_loading.svg';
import { ReactComponent as Success } from 'app/assets/svg/notification_success.svg';
import { ReactComponent as Warning } from 'app/assets/svg/notification_warning.svg';
import { NOTIFICATION_TYPE } from './types';

export const getIcon = (type: NOTIFICATION_TYPE): JSX.Element => {
  switch (type) {
    case NOTIFICATION_TYPE.SUCCESS:
      return <Success />;
    case NOTIFICATION_TYPE.ERROR:
      return <Error />;
    case NOTIFICATION_TYPE.WARNING:
      return <Warning />;
    case NOTIFICATION_TYPE.INFO:
      return <Loading />;

    default:
      return <Warning />;
  }
};
