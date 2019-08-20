module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:react/recommended',
        'plugin:jsx-control-statements/recommended',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'prettier/react'
    ],
    'settings': {
        'react': {
            'version': 'detect',
        }
    },
    plugins: ['@typescript-eslint', 'react', 'jsx-control-statements', 'prettier',
        'react-hooks', 'jsx-a11y'
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        'jsx-control-statements/jsx-control-statements': true
    },
    globals: {
        $: true,
        Markdown: true
    },
    // 配置自定义规则
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'prettier/prettier': 1,
        '@typescript-eslint/indent': ['error', 4, {
            VariableDeclarator: 4,
            SwitchCase: 1
        }],
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'no-console': ['warn', {
            allow: ['warn', 'error']
        }],
        'eqeqeq': ['warn', 'always'],
        // React相关校验规则
        'react/jsx-indent': [2, 4],
        'react/jsx-no-undef': [1, {
            allowGlobals: true
        }],
        'jsx-control-statements/jsx-use-if-tag': 0
    }
};