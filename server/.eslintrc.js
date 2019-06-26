module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import', 'jsx-a11y', 'meteor', 'react', 'flowtype'],
  extends: [
    'eslint:recommended',
    'plugin:meteor/recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  globals: {},
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
    'import/resolver': {
      alias: [['db', './src/db'], ['api', './src/api'], ['ui', './src/client']],
    },
  },
  rules: {
    'import/no-unresolved': ['error', { ignore: ['^meteor/', '^/'] }],
    'no-console': 0
  },
};
