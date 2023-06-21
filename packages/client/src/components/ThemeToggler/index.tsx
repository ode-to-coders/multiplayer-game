import { useGetUserInfoQuery } from '../../app/store/api/auth/authApi';
import {
  useCreateUserThemeMutation,
  useGetUserThemeQuery,
  useUpdateUserThemeMutation,
} from '../../app/store/api/userTheme';
import { StyledSwitch } from '../../shared/ui/Styled';
import { setStyleProperty } from '../../utils/setStyleProperty';
import { useEffect, useState } from 'react';

export const ThemeToggler = () => {
  const { data } = useGetUserInfoQuery();
  const [mainTheme, setMainTheme] = useState<string | null>('');

  const [createUserTheme] = useCreateUserThemeMutation();
  const [updateUserTheme] = useUpdateUserThemeMutation();
  const { data: theme } = useGetUserThemeQuery({
    ownerId: data?.id,
  });

  const checkbox =
    typeof window !== 'undefined' ? localStorage.getItem('checkbox') : true;
  const [checked, setChecked] = useState(checkbox === 'false' ? false : true);

  const toggleTheme = (currentTheme: string) => {
    if (!currentTheme) return;
    if (data?.id && currentTheme !== mainTheme) {
      updateUserTheme({
        theme: currentTheme,
        ownerId: data?.id,
      });
    }

    setMainTheme(currentTheme);
    setStyleProperty(currentTheme);
    localStorage.setItem('theme', currentTheme);
    setChecked(currentTheme === 'dark' ? true : false);
    document.documentElement.dataset.theme = currentTheme;
  };

  useEffect(() => {
    const defaultTheme = document.documentElement.dataset.theme;
    if (!mainTheme) {
      const initialTheme = localStorage.getItem('theme') ?? defaultTheme;
      if (initialTheme) {
        setMainTheme(initialTheme);
        setStyleProperty(initialTheme);
        document.documentElement.dataset.theme = initialTheme;
        setChecked(initialTheme === 'dark' ? true : false);
      }
    }
  }, []);

  useEffect(() => {
    if (data?.id && !localStorage.getItem('theme')) {
      const themeIsValid = typeof theme === 'string' && theme !== mainTheme;
      if (themeIsValid ) {
        toggleTheme(theme);
      } else if (theme === undefined) {
        createUserTheme({
          theme: 'dark',
          ownerId: data?.id,
        });
        setMainTheme('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    let checkedTheme = '';
    setChecked(event.target.checked);

    if (checked) {
      checkedTheme = 'light';
    } else {
      checkedTheme = 'dark';
    }

    toggleTheme(checkedTheme);

    localStorage.setItem('checkbox', String(event.target.checked));
  };

  return <StyledSwitch checked={checked} onChange={handleChangeChecked} />;
};
