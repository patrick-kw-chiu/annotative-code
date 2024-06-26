const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

module.exports = {
  ...withNextra(),
  basePath: '/annotative-code',
  output: 'export',
  images: {
    unoptimized: true,
  },
};
