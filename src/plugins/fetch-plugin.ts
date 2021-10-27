import { PluginBuild, OnLoadArgs, OnLoadResult } from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'filecache',
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: PluginBuild) {
            //Handling entry point - index.js
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            });

        build.onLoad({filter: /.*/}, async (args: OnLoadArgs) => {
            const cachedResult = await fileCache.getItem<OnLoadResult>(
                args.path
            );

            return cachedResult;
        })
            //Loading css
            build.onLoad({filter: /.ccs$/}, async (args: OnLoadArgs) => {

                const { data, request } = await axios.get(args.path);

                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                const contents =`
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                `;
                const result: OnLoadResult = {
                    loader: 'jsx',
                    resolveDir: new URL('./', request.responseURL).pathname,
                    contents,
                };

                await fileCache.setItem(args.path, result);

                return result;

            })

            build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
                const { data, request } = await axios.get(args.path);
                
                const result: OnLoadResult = {
                    loader: 'jsx',
                    resolveDir: new URL('./', request.responseURL).pathname,
                    contents: data,
                };

                await fileCache.setItem(args.path, result);

                return result;
            });
        },
    };
};
