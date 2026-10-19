import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// First on purpose: validates the environment at startup, so a missing variable fails here and
// not at the first request.
import '@/config/env';
import '@/config/theme/theme.css';

import { App } from '@/app/App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element #root not found in index.html.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
