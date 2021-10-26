import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve(
                { filter: /.*/ },
                async (args: esbuild.OnResolveArgs) => {
                    console.log('onResolve', args);
                    if (args.path === 'index.js') {
                        return { path: args.path, namespace: 'a' };
                    }
                    if (args.path.includes('./') || args.path.includes('../')) {
                        return {
                            namespace: 'a',
                            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
                        };
                    }
                    return {
                        namespace: 'a',
                        path: `https://unpkg.com/${args.path}`,
                    };
                }
            );

            build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
                console.log('onLoad', args);

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: `
                import lodash from 'lodash/fp';
                import react from 'react';
                console.log(lodash);
                console.log(react);
            `,
                    };
                }

                const { data, request } = await axios.get(args.path);
                console.log(request);
                console.log(data);
                return {
                    loader: 'jsx',
                    resolveDir: new URL('./', request.responseURL).pathname,
                    contents: data,
                };
            });
        },
    };
};
