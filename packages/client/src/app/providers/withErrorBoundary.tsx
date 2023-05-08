import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallbackPage } from '../../pages/ErrorFallbackPage/ErrorFallbackPage';

export const withErrorBoundary = (component: () => React.ReactNode) => () =>
  <ErrorBoundary fallback={<ErrorFallbackPage />}>{component()}</ErrorBoundary>;
