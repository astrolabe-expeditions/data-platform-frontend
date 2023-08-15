const withNextIntl = require('next-intl/plugin')(
    './lib/i18n.js'
);

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({})

module.exports = nextConfig
