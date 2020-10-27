module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier',
    'prettier/vue',
  ],
  rules: {
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/no-v-html': 0,
    indent: ['error', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/attribute-hyphenation': 0,
  },
  globals: {
    $nuxt: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
