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
  async headers() {
    return [
      {
        // Routes this applies to
        source: '/api/(.*)',
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}
