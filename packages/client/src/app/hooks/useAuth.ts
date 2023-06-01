import { useEffect } from 'react';
import { useGetUserInfoQuery } from '../store/api/auth/authApi';
import { setIsAuth } from '../store/auth/authSlice';
import { useAppDispatch } from '../store/store';

export const useAuth = () => {
  const { isError, isFetching } = useGetUserInfoQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(setIsAuth(false));
    } else {
      dispatch(setIsAuth(true));
    }
  }, [isError, isFetching]);

  return { isAuth: !isError, isFetching };
};
