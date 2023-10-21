import React from 'react';
import { useRouter } from 'next/router';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span>
      <img
        src="/annotative-code/annotative-2.png"
        alt="Annotative Code | Generated with Stable Diffusion XL"
        width="48"
        style={{ display: 'inline-block' }}
      />
      <span style={{ paddingLeft: '12px' }}>Annotative Code</span>
    </span>
  ),
  useNextSeoProps: () => {
    const { asPath } = useRouter();
    if (asPath === '/') {
      return {
        titleTemplate: 'Annotative Code',
      };
    }
    return {
      titleTemplate: '%s | Annotative Code',
    };
  },
  project: {
    link: 'https://github.com/patrick-kw-chiu/annotative-code',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase:
    'https://github.com/patrick-kw-chiu/annotative-code/tree/main/docs',
  footer: {
    text: 'Nextra Docs Template',
  },
};

export default config;
