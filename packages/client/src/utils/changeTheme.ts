import { setStyleProperty } from './setStyleProperty';

export const changeTheme = () => {
  const root = document.querySelector(':root') as HTMLElement;

  if (root.className === 'light') {
    root.className = '';
    root.classList.add('dark');
  } else {
    root.className = '';
    root.classList.add('light');
  }
  setStyleProperty(root.className);
  localStorage.setItem('theme', root.className);
};
