module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      plugins: ['@nrwl/nx'],
      rules: {
        '@nrwl/nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.js', '*.jsx'],
      env: {
        browser: true,
        commonjs: true,
        es2021: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
      extends: ['eslint:recommended', 'prettier'],
      rules: {
        // -------------------
        // SYDLE Development Guide - JS rules
        // -------------------
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-negated-condition': 'error',

        // Comments: prettify doesn't format comments, so it has to be manual
        'capitalized-comments': ['warn', 'always', { ignoreConsecutiveComments: true }],
        'no-inline-comments': 'warn',
        'spaced-comment': 'warn',
        'line-comment-position': 'warn',
        'lines-around-comment': [
          'warn',
          {
            beforeBlockComment: true,
            beforeLineComment: true,
            allowBlockStart: true,
            allowObjectStart: true,
            allowClassStart: true,
          },
        ],

        // -------------------
        // SYDLE UI - JS rules
        // -------------------
        'no-nested-ternary': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'object-shorthand': ['error', 'always'],
        'prefer-template': 'warn',
        'prefer-object-spread': 'error',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json'],
      },
      plugins: ['@typescript-eslint', 'react'],
      settings: {
        react: {
          pragma: 'React',
          version: 'detect',
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'plugin:@stencil-community/recommended',
        'prettier',
      ],
      rules: {
        // -------------------
        // SYDLE Development Guide - JS rules
        // -------------------

        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-negated-condition': 'error',

        // Comments: prettify doesn't format comments, so it has to be manual
        'capitalized-comments': ['warn', 'always', { ignoreConsecutiveComments: true }],
        'no-inline-comments': 'warn',
        'spaced-comment': 'warn',
        'line-comment-position': 'warn',
        'lines-around-comment': [
          'warn',
          {
            beforeBlockComment: true,
            beforeLineComment: true,
            allowBlockStart: true,
            allowObjectStart: true,
            allowClassStart: true,
          },
        ],

        // -------------------
        // SYDLE UI - JS rules
        // -------------------

        'no-nested-ternary': 'error',
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        'object-shorthand': ['error', 'always'],
        'prefer-template': 'warn',
        'prefer-object-spread': 'error',

        // -------------------
        // SYDLE Development Guide - TS rules
        // -------------------

        '@typescript-eslint/strict-boolean-expressions': [
          'warn',
          {
            allowNullableObject: true,
            allowNullableBoolean: true,
            allowNullableString: true,
            allowAny: true,
          },
        ],

        // -------------------
        // SYDLE UI - TS rules
        // -------------------
        '@typescript-eslint/prefer-optional-chain': 'error',

        // Config 'strictNullChecks' is activated, however we frequently use the `any` type, so some rules needed to be disabled
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': ['error', { allowAny: true }],

        // Rule prefer-template already checks string and number/variable concatenation
        '@typescript-eslint/restrict-plus-operands': 'off',

        // Avoid the verbose correction when async functions are used in forEach, setTimeout and others
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],

        '@typescript-eslint/explicit-module-boundary-types': [
          'warn',
          {
            allowArgumentsExplicitlyTypedAsAny: true,
            allowedNames: [
              'connectedCallback',
              'disconnectedCallback',
              'componentWillLoad',
              'componentDidLoad',
              'componentWillUpdate',
              'componentDidUpdate',
              'componentWillRender',
              'componentShouldRender',
              'componentDidRender',
              'render',
            ],
          },
        ],

        // -------------------
        // SYDLE UI - Stencil rules
        // -------------------

        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: 'h' }],

        // Stencil: @method requires async but not always they use await
        '@typescript-eslint/require-await': 'off',

        // Stencil: @method requires async, so when we call it is a floating promise
        '@typescript-eslint/no-floating-promises': 'off',

        'react/display-name': 'off',
        'react/no-unknown-property': ['warn', { ignore: ['class'] }],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],

        // Default is warning
        '@stencil-community/own-props-must-be-private': 'error',
        '@stencil-community/required-jsdoc': 'error',

        // Default is error
        '@stencil-community/strict-boolean-conditions': 'off',
      },
    },
  ],
};
