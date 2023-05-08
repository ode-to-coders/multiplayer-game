import { withErrorBoundary } from './withErrorBoundary';
// import { withRouter } from './withRouter';

import compose from '../../shared/utils/compose';

export const withProviders = compose(withErrorBoundary);
