import { useRef, useState } from 'react';
import ReactDom from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { useEffect } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const iframe = useRef<any>();

  const startService = async () => {
    try {
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.8/esbuild.wasm',
      });
      console.log(esbuild);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = `
      <html>
        <head>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.addEventListener('message', (event) => {
              eval(event.data);
            }, false);
          </script>
        </body>
      </html>
    `;

  return (
    <>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe ref={iframe} title="playground" sandbox="allow-scripts" srcDoc={html} />
    </>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));
