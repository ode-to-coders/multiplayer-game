const themes: Record<string, Record<string, string>> = {
  dark: {
    '--color-layout': '#343739',
    '--color-primary': '#fff',
    '--color-lightGrey': '#eaeaea',
    '--color-grey': '#999999',
    '--color-darkGrey': '#666869',
    '--color-darkestGrey': '#414345',
    '--color-orange': '#fc920c',
    '--color-blue': '#00a0d7',
    '--color-error': '#ff2f2f',
    '--color-divider': '#eeeeee',
    '--color-success': '#5fc576',
    '--color-black': '#000',
    '--darken-blue': '#00678b',
  },
  light: {
    '--color-layout': '#fff',
    '--color-primary': '#343739',
    '--color-primary-button': '#fff',
    '--color-lightGrey': '#999999',
    '--color-grey': '#999999',
    '--color-darkGrey': '#eaeaea',
    '--color-darkestGrey': '#eaeaea',
    '--color-orange': '#fc920c',
    '--color-blue': '#7facd6',
    '--color-error': '#c77878',
    '--color-divider': '#eeeeee',
    '--color-success': '#5fc576',
    '--color-black': '#000',
    '--darken-blue': '#4586c3',
  },
};

export const setStyleProperty = (theme: string) => {
  const root = document.querySelector(':root') as HTMLElement;
  const mainTheme = themes[theme];
  for (const variable in mainTheme) {
    root.style.setProperty(variable, mainTheme[variable]);
  }
};
