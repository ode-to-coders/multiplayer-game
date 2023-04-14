import s from './index.module.scss';

import { useGetUserInfoQuery } from 'app/store/api/auth/authApi';
import { DataLoader } from 'shared/ui/DataLoader/DataLoader';
import { ProfileContent } from './features/ProfileContent/ProfileContent';
import { PAGES } from '@/app/lib/routes.types';

type Props = {
  page: PAGES;
};

const PROFILE_ERROR = 'Не удалось получить данные профиля';

export const Profile = ({ page }: Props) => {
  const { data, isError, isFetching } = useGetUserInfoQuery();

  return (
    <div className={s.wrap}>
      <DataLoader
        isLoading={isFetching}
        isError={isError}
        data={data}
        errorMessage={PROFILE_ERROR}>
        {data => <ProfileContent page={page} data={data} />}
      </DataLoader>
    </div>
  );
};
