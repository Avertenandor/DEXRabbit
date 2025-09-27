module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4322/DEXRabbit/'],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local: http://localhost:4322',
      startServerReadyTimeout: 30000,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 90 }],
        'categories:accessibility': ['error', { minScore: 90 }],
        'categories:best-practices': ['error', { minScore: 90 }],
        'categories:seo': ['error', { minScore: 90 }],
        'categories:pwa': 'off',
        'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.02 }],
        'total-blocking-time': ['error', { maxNumericValue: 250 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
