module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    // 'plugin:vue/recommended',
    // '@vue/standard',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
