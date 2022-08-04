const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    config.module
      .rule("md")
      .test(/\.md$/)

      .use("html")
      .loader("html-loader")
      .end()
      .use("markdown")
      .loader("markdown-loader")
      .options({ headerIds: false })
      .end();
  },
})
