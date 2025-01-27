// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
    parser: 'babel-eslint',

    extends: [
        'airbnb-base',
        'plugin:flowtype/recommended',
        'plugin:css-modules/recommended',
        'prettier',
        'prettier/flowtype',
    ],

    plugins: ['flowtype', 'css-modules', 'prettier'],

    globals: {
        __DEV__: true,
    },

    env: {
        browser: false,
    },

    rules: {
        'no-nested-ternary': 'off',
        'no-use-before-define': 'off',
        camelcase: 'off',
        // Forbid the use of extraneous packages
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': ['error', {packageDir: '.'}],

        // Recommend not to leave any console.log in your code
        // Use console.error, console.warn and console.info instead
        // https://eslint.org/docs/rules/no-console
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info'],
            },
        ],

        // Prefer destructuring from arrays and objects
        // http://eslint.org/docs/rules/prefer-destructuring
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        // ESLint plugin for prettier formatting
        // https://github.com/prettier/eslint-plugin-prettier
        'prettier/prettier': 'error',
    },

    settings: {
        // Allow absolute paths in imports, e.g. import Button from 'components/Button'
        // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', 'app'],
            },
        },
    },
};
