import { RegForm } from '../../features/RegForm';

import s from './index.module.scss';

export const Registration = () => {
  return (
    <div className={s.wrapCont}>
      <RegForm />
    </div>
  );
};
