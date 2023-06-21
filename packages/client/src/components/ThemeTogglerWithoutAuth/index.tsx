import { setStyleProperty } from '../../utils/setStyleProperty';
import { StyledSwitch } from '../../shared/ui/Styled';

import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export const ThemeTogglerWithoutAuth = () => {
  const [mainTheme, setMainTheme] = useState<string | null>('');
  const checkbox =
    typeof window !== 'undefined' ? localStorage.getItem('checkbox') : true;
  const [checked, setChecked] = useState(checkbox === 'false' ? false : true);

  const toggleTheme = (currentTheme: string) => {
    if (!currentTheme) return;

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

  return (
    <StyledSwitch
      checked={checked}
      onChange={handleChangeChecked}
      extendсlass={styles.switch}
    />
  );
};
