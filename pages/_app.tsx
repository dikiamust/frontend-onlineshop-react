import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Scroll from 'react-scroll';

// utils
import { initGA, logPageView } from 'utils/analytics';

import ThemeProvider from '../theme';

declare global {
  interface Window {
    GA_INITIALIZED: any; // whatever type you want to give. (any,number,float etc)
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const autoScrollByHastag = () => {
    const scroller = Scroll.scroller;
    const isHastag = router.asPath.includes('#');
    if (isHastag) {
      let indexOfAsPath = router.asPath.indexOf('#');
      const hastag = router.asPath.slice(indexOfAsPath);

      scroller.scrollTo(hastag, {
        duration: 2000,
        delay: 100,
        smooth: true,
      });
    }
  };

  const initialGoogleAnalytics = () => {
    // Google analytics
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  };

  useEffect(() => {
    initialGoogleAnalytics();
  }, [router.pathname]);

  useEffect(() => {
    autoScrollByHastag();
  }, []);

  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>

      {/* <!-- Hotjar Tracking Code for http://natureworkslab.com/ --> */}
      <Script id="hotjar" strategy="afterInteractive">
        {`(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3121864,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </Script>
    </>
  );
}

export default MyApp;
