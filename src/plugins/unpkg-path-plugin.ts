import { PluginBuild, OnResolveArgs } from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: PluginBuild) {
            //Handling entry point - index.js
            build.onResolve(
                { filter: /(^index\.js)/ },
                (args: OnResolveArgs) => {
                    return { path: args.path, namespace: 'a' };
                }
            );
            //Relative paths
            build.onResolve(
                { filter: /^\.+\// },
                async (args: OnResolveArgs) => {
                    return {
                        namespace: 'a',
                        path: new URL(
                            args.path,
                            'https://unpkg.com' + args.resolveDir + '/'
                        ).href,
                    };
                }
            );
            //Package main file
            build.onResolve({ filter: /.*/ }, async (args: OnResolveArgs) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`,
                };
            });
        },
    };
};
