import { Link } from 'react-router-dom';

import { PAGES } from '@/app/lib/routes.types';

import { StyledButton } from './components/StyledButton';
import { StyledGroup } from './components/StyledGroup';

export const ButtonGroupBase = () => {
  return (
    <StyledGroup>
      <StyledButton>Заново!</StyledButton>
      <StyledButton>
        <Link style={{ color: 'var(--color-primary)' }} to={PAGES.game}>
          Покинуть лобби
        </Link>
      </StyledButton>
    </StyledGroup>
  );
};
