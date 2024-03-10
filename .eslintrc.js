module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['prettier', 'import', '@typescript-eslint'],
    rules: {
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
    },
};
