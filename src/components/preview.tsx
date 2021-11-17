import './preview.css';

import { useEffect, useRef } from 'react';

export interface PreviewProps {
  code: string;
  error: string;
}

export const Preview = ({ code, error }: PreviewProps) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

const html = `
<html>
  <head>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
        throw error;
      }
      window.addEventListener('error', (event) => { event.preventDefault(); handleError(event.error) })
      window.addEventListener('message', (event) => {
        try{
          eval(event.data);
        } catch(error) {
          handleError(error);
        }
      }, false);
    </script>
  </body>
</html>
`;
