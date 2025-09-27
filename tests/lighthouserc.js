module.exports = {
  ci: {
    collect: {
      url: [
        'https://xn--80apagbbfxgmuj4j.site/',
        'https://xn--80apagbbfxgmuj4j.site/restaurants.html',
        'https://xn--80apagbbfxgmuj4j.site/gifts.html',
        'https://xn--80apagbbfxgmuj4j.site/investment-model.html',
        'https://xn--80apagbbfxgmuj4j.site/development.html',
        'https://xn--80apagbbfxgmuj4j.site/breeding.html',
        'https://xn--80apagbbfxgmuj4j.site/logistics.html',
        'https://xn--80apagbbfxgmuj4j.site/contacts.html'
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.75 }],
        'categories:accessibility': ['error', { minScore: 0.85 }],
        'categories:best-practices': ['error', { minScore: 0.80 }],
        'categories:seo': ['error', { minScore: 0.85 }],
        'categories:pwa': ['warn', { minScore: 0.70 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    server: {
      command: 'python -m http.server 3001',
      port: 3001,
      url: 'http://localhost:3001'
    }
  }
};