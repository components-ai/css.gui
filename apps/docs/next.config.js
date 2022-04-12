const path = require('path')
const withTM = require('next-transpile-modules')(['gui'])

module.exports = withTM({
  reactStrictMode: true,
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
