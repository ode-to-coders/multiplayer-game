import { JSCOLORS } from 'pages/TestCanvas/const';

export const helperBorderColor = (what: string) => {
  const color = what === JSCOLORS.black ? JSCOLORS.white
    : what === 'fantasy' ? JSCOLORS.fantasy
    : what === 'modern' ? JSCOLORS.modern
    : JSCOLORS.england;
  return color;
}
