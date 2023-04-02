import { Link } from 'react-router-dom';

import { PAGES } from '../../../app/lib/routes.types';
import { StyledButton, StyledButtonGroup } from '../Styled';

import style from './index.module.scss';

export const ButtonGroupBase = () => {
  return (
    <StyledButtonGroup>
      <StyledButton>Заново!</StyledButton>
      <StyledButton>
        <Link className={style.link} to={PAGES.GAME}>
          Покинуть лобби
        </Link>
      </StyledButton>
    </StyledButtonGroup>
  );
};
