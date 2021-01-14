module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs',
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
