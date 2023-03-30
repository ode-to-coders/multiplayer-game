import { Link } from 'react-router-dom';

import { PAGES } from '../../../app/lib/routes.types';

import { StyledButton } from '../Styled/StyledButton';
import { StyledButtonGroup } from '../Styled/StyledButtonGroup';

export const ButtonGroupBase = () => {
  return (
    <StyledButtonGroup>
      <StyledButton>Заново!</StyledButton>
      <StyledButton>
        <Link style={{ color: 'var(--color-primary)' }} to={PAGES.game}>
          Покинуть лобби
        </Link>
      </StyledButton>
    </StyledButtonGroup>
  );
};
