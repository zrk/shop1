module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/shop1/'
    : '/',

  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/base.scss";',
      },
    },
  },
};
