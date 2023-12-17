import { useRef, useEffect } from 'react';
import Webamp from 'webamp';

const config = {
  initialTracks: [
    {
      metaData: {
        artist: '',
        title: 'Nightwave Plaza',
      },
      url: 'http://radio.plaza.one/mp3',
    },
  ],
};

export function WebampView() {
  const ref = useRef(null);
  const webamp = useRef(null);
  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }
    webamp.current = new Webamp(config);
    webamp.current.renderWhenReady(target).then(() => {
      target.appendChild(document.querySelector('#webamp'));
    });
    return () => {
      webamp.current.dispose();
      webamp.current = null;
    };
  }, []);
  return <div style={{ position: 'relative' }} ref={ref} />;
}
