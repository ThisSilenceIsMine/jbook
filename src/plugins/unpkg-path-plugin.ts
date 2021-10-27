import {PluginBuild, OnResolveArgs, OnLoadArgs,  OnLoadResult} from 'esbuild-wasm'
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'filecache',
});

export const unpkgPathPlugin = (inputCode: string) => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: PluginBuild) {
            //Handling entry point - index.js
            build.onResolve({filter: /(^index\.js)/}, (args: OnResolveArgs) =>{
                return { path: args.path, namespace: 'a' };
            })
            //Relative paths
            build.onResolve({filter: /^\.+\//}, async (args: OnResolveArgs) =>{
                return {
                    namespace: 'a',
                    path: new URL(
                        args.path,
                        'https://unpkg.com' + args.resolveDir + '/'
                    ).href,
                };
            })
            //Package main file
            build.onResolve(
                { filter: /.*/ },
                async (args: OnResolveArgs) => {
                    return {
                        namespace: 'a',
                        path: `https://unpkg.com/${args.path}`,
                    };
                }
            );

            build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode
                    };
                }

                const cachedResult = await fileCache.getItem<OnLoadResult>(args.path);
                
                if(cachedResult) {
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
