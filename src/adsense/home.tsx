import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const HomeAdSense: React.FC = () => {
  useEffect(() => {
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      window.adsbygoogle.push({});
    } else {
      window.adsbygoogle = [];
    }
  }, []);

  return (
    <>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4848884931206344" crossOrigin="anonymous"></script>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4848884931206344"
        data-ad-slot="4674768561"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </>
  );
};

export default HomeAdSense;
