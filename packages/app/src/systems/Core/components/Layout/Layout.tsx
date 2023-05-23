import type { ThemeUtilsCSS } from '@fuel-ui/css';
import { cssObj } from '@fuel-ui/css';
import { Box } from '@fuel-ui/react';
import type { FC, ReactNode } from 'react';
import { forwardRef, useRef, useContext, createContext } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { coreStyles } from '../../styles/core';

import { BottomBar } from './BottomBar';
import { TopBar } from './TopBar';

import { IS_CRX_POPUP, WALLET_HEIGHT, WALLET_WIDTH } from '~/config';
import { OverlayDialog } from '~/systems/Overlay';
import { Sidebar } from '~/systems/Sidebar';

type Context = {
  isLoading?: boolean;
  isHome?: boolean;
  title?: string;
  ref?: React.RefObject<HTMLDivElement>;
};

const ctx = createContext<Context>({});

type ContentProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: any;
  children: ReactNode;
  css?: ThemeUtilsCSS;
};

const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ as, children, css }, ref) => {
    return (
      <Box
        as={as}
        ref={ref}
        css={{ ...styles.content, ...css }}
        className="layout__content"
      >
        {children}
      </Box>
    );
  }
);

export type LayoutProps = Context & {
  isPublic?: boolean;
  children: ReactNode;
};

type LayoutComponent = FC<LayoutProps> & {
  Content: typeof Content;
  TopBar: typeof TopBar;
  BottomBar: typeof BottomBar;
};

export const Layout: LayoutComponent = ({
  isPublic,
  isLoading,
  title,
  children,
}: LayoutProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const titleText = title ? `${title} | Fuel` : 'Fuel';
  const location = useLocation();
  const isHome = location.pathname === '/wallet';

  return (
    <>
      <ctx.Provider value={{ isLoading, title, isHome, ref }}>
        <Helmet>
          <title>{titleText}</title>
        </Helmet>
        {isPublic ? (
          <Box.Centered as="main" css={styles.root} data-public>
            {children}
          </Box.Centered>
        ) : (
          <Box.Centered as="main" css={styles.root}>
            <Box css={styles.wrapper} className="layout__wrapper">
              <OverlayDialog />
              <Sidebar ref={ref} />
              <Box ref={ref} css={styles.inner} className="layout__inner">
                {children}
              </Box>
            </Box>
          </Box.Centered>
        )}
        {import.meta.env.NODE_ENV === 'test' && (
          <Box css={{ visibility: 'hidden' }}>
            {isLoading ? 'is loading' : 'is loaded'}
          </Box>
        )}
      </ctx.Provider>
    </>
  );
};

Layout.Content = Content;
Layout.TopBar = TopBar;
Layout.BottomBar = BottomBar;

export const styles = {
  root: cssObj({
    minH: '100vh',
    width: IS_CRX_POPUP ? WALLET_WIDTH : '100vw',

    '&:has(.layout__bottom) .layout__content': {
      pb: '$0',
    },
  }),
  wrapper: cssObj({
    overflow: 'clip',
    position: 'relative',
    width: WALLET_WIDTH,
    height: WALLET_HEIGHT,
    background: '$body',
    border: '1px solid $border',
    borderRadius: '$default',
    zIndex: '$0',
  }),
  inner: coreStyles.fullscreen,
  content: cssObj({
    ...coreStyles.scrollable(),
    padding: '$0 $4',
    flex: 1,
  }),
};

export function useLayoutContext() {
  return useContext(ctx);
}
