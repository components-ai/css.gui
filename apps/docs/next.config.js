const path = require('path')
const withTM = require('next-transpile-modules')(['gui'])

module.exports = withTM({
  reactStrictMode: true,
  // This is an attempted fix for a bug in the Turbo's usage of
  // next-transpile-modules, though as configured it doesn't
  // seem to work and I'm not sure why. Will kick the can for now.
  //
  // • https://github.com/vercel/turborepo/issues/338
  // • https://github.com/martpie/next-transpile-modules
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['react', ...config.externals]
    }

    // Point the alias to the workspace root, since that's where it's installed
    const reactPath = path.resolve(__dirname, '../..', 'node_modules', 'react')
    config.resolve.alias['react'] = reactPath

    return config
  },
})
