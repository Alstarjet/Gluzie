import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const FeedAdSense: React.FC = () => {
  useEffect(() => {
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      window.adsbygoogle.push({});
    } else {
      window.adsbygoogle = [];
    }
  }, []);

  return (
    <>
      <Helmet>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4848884931206344" crossOrigin="anonymous"></script>
      </Helmet>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-format="fluid"
           data-ad-layout-key="-fb+5w+4e-db+86"
           data-ad-client="ca-pub-4848884931206344"
           data-ad-slot="5398830908"></ins>
    </>
  );
};

export default FeedAdSense;
