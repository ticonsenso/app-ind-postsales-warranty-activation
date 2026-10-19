import { setupServer } from 'msw/node';

import { handlers } from './handlers';

/** Fake backend used by every test. Unhandled requests fail the test instead of reaching the network. */
export const server = setupServer(...handlers);
