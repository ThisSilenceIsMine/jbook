import { useState } from 'react';
import ReactDom from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { useEffect } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        try {
            await esbuild.initialize({
                worker: true,
                wasmURL: '/esbuild.wasm',
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
            plugins: [unpkgPathPlugin()]
        })

        setCode(result.outputFiles[0].text)
    };

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
        </>
    );
};

ReactDom.render(<App />, document.querySelector('#root'));
