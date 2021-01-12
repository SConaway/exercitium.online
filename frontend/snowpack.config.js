const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({ target: 'http://localhost:5000' });

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv'],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
    // out: '../public',
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
  experiments: {
    optimize: {
      bundle: true,
      minify: true,
      target: 'es2018',
    },
    routes: [
      {
        src: '/game/.*',
        dest: (req, res) => proxy.web(req, res),
      },
    ],
  },
};
