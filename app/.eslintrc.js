module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: false
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-console': 'warn'
  },
  globals: {
    fetch: false
  }
};
