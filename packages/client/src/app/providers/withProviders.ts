import { withErrorBoundary } from './withErrorBoundary';
import { withRouter } from './withRouter';
import { withStore } from './withStore';

import compose from 'shared/utils/compose';

export const withProviders = compose(withRouter, withStore, withErrorBoundary);
