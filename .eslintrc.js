module.exports = {
  root: true,

  plugins: [
    'ember'
  ],

  extends: [
    'airbnb-base',
    'plugin:ember/recommended'
  ],

  env: {
    browser: true,
    node: false
  },

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },

  rules: {
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'arrow-parens': ['error', 'always'],
    'prefer-const': 0,
    'comma-dangle': 0,
    'prefer-arrow-callback': 0,
    'func-names': 0,
    'prefer-rest-params': 0,
    'no-underscore-dangle': 0,
    'array-callback-return': 0,

    'space-before-function-paren': [2, {
      'anonymous': 'never',
      'named': 'never'
    }],

    'generator-star-spacing': [2, {
      'before': false,
      'after': true
    }]
  },

  overrides: [
    // for Ember node files
    {
      files: [
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],

      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },

      env: {
        browser: false,
        node: true
      }
    }
  ]
};
