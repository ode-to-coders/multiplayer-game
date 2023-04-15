import { useEffect } from 'react';
import { useGetUserInfoQuery } from '../store/api/auth/authApi';
import { setIsAuth } from '../store/auth/authSlice';

export const useAuth = () => {
  const { isError, isFetching } = useGetUserInfoQuery();

  useEffect(() => {
    if (isError) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, [isError, isFetching]);

  return { isAuth: !isError, isFetching };
};
