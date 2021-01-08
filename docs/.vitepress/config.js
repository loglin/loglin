// @ts-check

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'loglin📋',
  description: 'Super fast & lightweight Node.js logger',
  themeConfig: {
    repo: 'loglin/loglin',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Reporters', link: '/reporters/' },
      {
        text: 'API',
        link: '/api/',
      },
    ],
    sidebar: {
      '/api/': 'auto',
      '/': [
        {
          text: 'Guide',
          children: [
            {
              text: 'Introduction',
              link: '/guide/introduction',
            },
            {
              text: 'Getting Started',
              link: '/guide/',
            },
          ],
        },
        {
          text: 'Reporters',
          children: [
            {
              text: 'Console Reporter',
              link: '/reporters/reporter-console',
            },
          ],
        },
        {
          text: 'API',
          children: [
            {
              text: 'createLogger',
              link: '/api/#createlogger',
            },
          ],
        },
      ],
    },
  },
}
