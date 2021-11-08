import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from 'bundler/plugins/unpkg-path-plugin';
import { fetchPlugin } from 'bundler/plugins/fetch-plugin';

const __initializePromise = esbuild.initialize({
  worker: true,
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.8/esbuild.wasm',
});

export const bundle = async (rawCode: string) => {
  await __initializePromise;

  return esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window',
    },
  });
};
