const {
  RATE_LIMIT_MINUTES,
  RATE_LIMIT_MAX_HITS,
} = require('./config');
const {
  USERS_SERVICE,
  CATEGORIES_SERVICE,
  NOTES_SERVICE,
} = require('./microServices');

const ROUTES = [
  {
    url: '/api/login',
    auth: false,
    rateLimit: {
      windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
      max: RATE_LIMIT_MAX_HITS,
    },
    proxy: {
      target: USERS_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        '^/api/login': '/api/v1/login',
      },
    },
  },
  {
    url: '/api/signup',
    auth: false,
    rateLimit: {
      windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
      max: RATE_LIMIT_MAX_HITS,
    },
    proxy: {
      target: USERS_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        '^/api/signup': '/api/v1/users',
      },
    },
  },
  {
    url: '/api/categories',
    auth: false,
    rateLimit: {
      windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
      max: RATE_LIMIT_MAX_HITS,
    },
    proxy: {
      target: CATEGORIES_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        '^/api/categories': '/api/v1/categories',
      },
    },
  },
  {
    url: '/api/categories/:id',
    auth: false,
    rateLimit: {
      windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
      max: RATE_LIMIT_MAX_HITS,
    },
    proxy: {
      target: CATEGORIES_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        '^/api/categories/:id': '/api/v1/categories/:id',
      },
    },
  },
  {
    url: '/api/notes',
    auth: false,
    rateLimit: {
      windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
      max: RATE_LIMIT_MAX_HITS,
    },
    proxy: {
      target: NOTES_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        '^/api/notes': '/api/v1/notes',
      },
    },
  },
  {
    url: '/api/notes/:id',
    auth: false,
    rateLimit: {
      windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
      max: RATE_LIMIT_MAX_HITS,
    },
    proxy: {
      target: NOTES_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        '^/api/notes/:id': '/api/v1/notes/:id',
      },
    },
  },
  {
    url: '/api/notes/search',
    auth: false,
    rateLimit: {
      windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
      max: RATE_LIMIT_MAX_HITS,
    },
    proxy: {
      target: NOTES_SERVICE,
      changeOrigin: true,
      pathRewrite: {
        '^/api/notes/search': '/api/v1/notes/search',
      },
    },
  },
];

exports.ROUTES = ROUTES;
