'use strict';

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
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  rules: {
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'arrow-parens': ['error', 'always'],
    'comma-dangle': 'off',
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'prefer-rest-params': 'off',
    'no-underscore-dangle': 'off',
    'array-callback-return': 'off',
    'prefer-const': 'off',

    // Optional ember rules
    'ember/alias-model-in-controller': 'off',
    'ember/named-functions-in-promises': 'off',
    'ember/use-ember-get-and-set': 'off',
    'ember/avoid-leaking-state-in-components': 'off',
    'ember/local-modules': 'error',
    'ember/no-empty-attrs': 'error',
    'ember/no-jquery': 'error',
    'ember/no-observers': 'error',
    'ember/order-in-components': 'error',
    'ember/order-in-controllers': 'error',
    'ember/order-in-models': 'error',
    'ember/order-in-routes': 'error',

    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never'
    }],

    'generator-star-spacing': ['error', {
      before: false,
      after: true
    }]
  },

  overrides: [
    // for Ember node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'config/**/*.js',
      ],

      parserOptions: {
        sourceType: 'script'
      },

      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      })
    }
  ]
};
