const { svgoPlugins } = require('./configs/svgo.config.js');

export default {
  ssr: false,
  components: true,

  server: {
    port: process.env.FRONTEND_PORT,
    host: '0.0.0.0',
  },

  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources'],
  modules: ['@nuxtjs/axios', '@nuxtjs/svg-sprite'],

  plugins: ['@/api/plugin', '@/plugins/antd-ui', '@/plugins/vee-validate'],

  svgSprite: {
    input: '~/assets/icons',
    svgoConfig() {
      return {
        plugins: svgoPlugins(),
      };
    },
  },

  css: ['~/assets/default.scss', '~/assets/ant/main.less'],

  styleResources: {
    scss: ['~/assets/app.scss'],
  },

  axios: {},

  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
};
