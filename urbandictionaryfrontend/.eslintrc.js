module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-multi-spaces': 'error',
    'vue/attribute-hyphenation': 'error',
    'vue/this-in-template': 'error',
    'vue/key-spacing': 'error',
    'vue/keyword-spacing': 'error',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-indent': 'error',
    'vue/html-quotes': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/object-curly-spacing': 'error',
    'vue/script-indent': 'error',
    'vue/component-name-in-template-casing': 'error',
    'vue/comma-dangle': ['error', 'only-multiline'],
    'vue/component-definition-name-casing': 'error',
  },
};
