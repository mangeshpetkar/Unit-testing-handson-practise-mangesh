export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  open: '/',
  watch: true,
  appIndex: './index.html',

  // Add proxy settings for your API
  middleware: [
    function proxyApi(context, next) {
      if (context.url.startsWith('/api')) {
        context.url = context.url.replace('/api', '');
        context.proxy.web(context.req, context.res, { target: 'https://loanfeapi.herokuapp.com', changeOrigin: true });
      }
      return next();
    }
  ],

  // Optional: HMR plugin for hot reloading
  // plugins: [hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] })],
});
