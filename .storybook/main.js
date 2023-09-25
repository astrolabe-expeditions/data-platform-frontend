/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../components/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async webpackFinal(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    )
    fileLoaderRule.exclude = /\.svg$/

    config.module.rules.push({
      test: /\.svg$/i,
      enforce: 'pre',
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })
    return config
  },
}
export default config
