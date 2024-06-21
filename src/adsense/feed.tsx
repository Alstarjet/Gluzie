import React, { useEffect } from 'react';

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
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4848884931206344" crossOrigin="anonymous"></script>
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
