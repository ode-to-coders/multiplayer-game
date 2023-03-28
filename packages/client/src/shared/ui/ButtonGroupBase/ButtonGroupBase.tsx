import { PAGES } from '@/app/lib/routes.types';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';

type ButtonGroupBase = {
  style: Record<string, Record<string, string | number>>;
};
export const ButtonGroupBase = (props: ButtonGroupBase) => {
  const { style } = props;
  return (
    <ButtonGroup sx={style.buttonGroup}>
      <Button sx={style.button}>Заново!</Button>
      <Button sx={style.button}>
        <Link style={style.link} to={PAGES.game}>
          Покинуть лобби
        </Link>
      </Button>
    </ButtonGroup>
  );
};
