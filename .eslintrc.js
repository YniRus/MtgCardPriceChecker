module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': 'off',
    'quote-props': 'off',
    'semi': 'off',
    'quotes': 'off',
    'eol-last': 'off',
  },
}
