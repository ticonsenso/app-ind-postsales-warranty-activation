import { useLayoutEffect, useState } from 'react';

/**
 * Gives a full-screen view a container of its own at the end of `<body>` (render into it with
 * `createPortal`) and, while it is mounted, hides and disables the rest of the page, stops it from
 * scrolling and paints the document with `backgroundColor`.
 *
 * Covering the page with a fixed element is not enough: Safari on iOS draws its toolbars
 * see-through over the page, and a fixed element does not reach beneath them.
 */
export function usePageTakeover(backgroundColor: string): HTMLElement {
  const [host] = useState(() => document.createElement('div'));

  useLayoutEffect(() => {
    const { body, documentElement: html } = document;
    body.append(host);

    const hidden = [...body.children]
      .filter(
        (element): element is HTMLElement => element !== host && element instanceof HTMLElement,
      )
      .map((element) => ({
        element,
        visibility: element.style.visibility,
        wasInert: element.hasAttribute('inert'),
      }));
    for (const { element } of hidden) {
      element.style.visibility = 'hidden';
      element.setAttribute('inert', '');
    }

    const previous = {
      overflow: html.style.overflow,
      htmlBackground: html.style.backgroundColor,
      bodyBackground: body.style.backgroundColor,
    };
    html.style.overflow = 'hidden';
    html.style.backgroundColor = backgroundColor;
    body.style.backgroundColor = backgroundColor;

    return () => {
      for (const { element, visibility, wasInert } of hidden) {
        element.style.visibility = visibility;
        if (!wasInert) element.removeAttribute('inert');
      }
      html.style.overflow = previous.overflow;
      html.style.backgroundColor = previous.htmlBackground;
      body.style.backgroundColor = previous.bodyBackground;
      host.remove();
    };
  }, [host, backgroundColor]);

  return host;
}
