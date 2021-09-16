module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.ts', '.d.ts']
      }
    }
  },
  rules: {
    'space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-unresolved': 'off'
  }
}
