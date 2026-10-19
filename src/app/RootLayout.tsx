import { Outlet, ScrollRestoration } from 'react-router';

/** Root route element: scroll handling shared by every page. */
export function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
