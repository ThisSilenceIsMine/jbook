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
            build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode,
                    };
                }

                const cachedResult = await fileCache.getItem<OnLoadResult>(
                    args.path
                );

                if (cachedResult) {
                    return cachedResult;
                }

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
