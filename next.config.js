const withNextIntl = require('next-intl/plugin')('./lib/i18n.js')

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({})

module.exports = {
  ...nextConfig,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })
    return config
  },
}
