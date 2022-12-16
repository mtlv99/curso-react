module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // "import/extensions": "always",
    semi: 'warn',
    'max-len': 'off', // I need to write a lot of notes, some of them are really long.
    'no-multiple-empty-lines': 'off',
    'no-console': 'off', // This is for testing new concepts, I wouldn't normally disable it.
    // You should never disable no-unused-vars and no no-use-before-define in a real world scenario,
    // but in this case is to avoid certain issues with the lessons code.
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    // React import is no longer required since React 17
    'react/react-in-jsx-scope': 'off',
  },
};
