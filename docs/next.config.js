// import nextra from 'nextra';

// const withNextra = nextra({
//   theme: 'nextra-theme-docs',
//   themeConfig: './theme.config.tsx',
// });

// const nextConfig = {
//   ...withNextra(),
//   basePath: '/annotative-code',
// };

// export default nextConfig;

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
