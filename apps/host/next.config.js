//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const { createDelegatedModule } = require('@module-federation/utilities');
const { composePlugins, withNx } = require('@nx/next');

const remotes = (/** @type boolean */ isServer) => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    shop: createDelegatedModule(require.resolve('./remote-delegate.js'), {
      remote: `shop@http://localhost:4201/_next/static/${location}/remoteEntry.js`,
    }),
  };
};

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },

  compiler: {
    // For other options, see https://nextjs.org/docs/architecture/nextjs-compiler#emotion
    emotion: true,
  },

  webpack(originalConfig, { isServer }) {
    const config = { ...originalConfig };
    config.resolve = {
      ...config.resolve,
      fallback: { fs: false, net: false, tls: false },
    };
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(isServer),
        shared: {
          '@emotion/react': {
            singleton: true,
          },
          '@emotion/styled': {
            singleton: true,
          },
        },
        extraOptions: {},
        // runtimePlugins: [require.resolve(path.join(__dirname, "./runtime-plugin.js"))],
      })
    );

    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
