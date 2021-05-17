import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:9527',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
