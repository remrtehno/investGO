module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.eslint.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'simple-import-sort',
    'replace-relative-imports',
  ],

  rules: {
    // https://eslint.org/docs/rules/#possible-errors
    'for-direction': 'error',
    'getter-return': 'error',
    'no-async-promise-executor': 'off',
    'no-await-in-loop': 'warn',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-console': ['warn', {allow: ['error', 'warn']}],
    'no-constant-condition': 'warn',
    'no-control-regex': 'error',
    'no-debugger': 'warn',
    'no-dupe-args': 'error',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': 'warn',
    'no-empty-character-class': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-parens': 'off',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-import-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-loss-of-precision': 'warn',
    'no-misleading-character-class': 'warn',
    'no-obj-calls': 'error',
    'no-promise-executor-return': 'warn',
    'no-prototype-builtins': 'error',
    'no-regex-spaces': 'error',
    'no-setter-return': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'warn',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'warn',
    'no-unreachable-loop': 'warn',
    'no-unsafe-finally': 'warn',
    'no-unsafe-negation': ['error', {
      enforceForOrderingRelations: true,
    }],
    'no-unsafe-optional-chaining': ['error', {
      disallowArithmeticOperators: true,
    }],
    'no-useless-backreference': 'warn',
    'require-atomic-updates': 'error',
    'use-isnan': 'error',
    'valid-typeof': ['error', {
      requireStringLiterals: false,
    }],


    // https://eslint.org/docs/rules/#best-practices
    'accessor-pairs': 'off',
    'array-callback-return': 'warn',
    'block-scoped-var': 'warn',
    'class-methods-use-this': 'off',
    'complexity': 'off',
    'consistent-return': 'warn',
    'curly': 'warn',
    'default-case': 'warn',
    'default-case-last': 'warn',
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
    'default-param-last': 'off',
    'dot-location': ['warn', 'property'],
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
    'dot-notation': 'off',
    'eqeqeq': ['warn', 'always', {null: 'ignore'}],
    'grouped-accessor-pairs': ['warn'],
    'guard-for-in': 'off',
    'max-classes-per-file': ['warn', 1],
    'no-alert': 'warn',
    'no-caller': 'warn',
    'no-case-declarations': 'warn',
    'no-constructor-return': 'warn',
    'no-div-regex': 'off',
    'no-else-return': ['warn', {allowElseIf: false}],
    'no-empty-function': 'warn',
    'no-empty-pattern': 'warn',
    'no-eq-null': 'off',
    'no-eval': 'error',
    'no-extend-native': 'warn',
    'no-extra-bind': 'warn',
    'no-extra-label': 'off',
    'no-fallthrough': 'warn',
    'no-floating-decimal': 'warn',
    'no-global-assign': 'warn',
    'no-implicit-coercion': 'warn',
    'no-implicit-globals': 'off', // Modules has local scope
    'no-implied-eval': 'error',
    'no-invalid-this': 'warn',
    'no-iterator': 'warn',
    'no-lone-blocks': 'warn',
    'no-loop-func': 'warn',
    'no-magic-numbers': 'off',
    'no-multi-spaces': 'warn',
    'no-multi-str': 'warn',
    'no-new': 'warn',
    'no-new-func': 'warn',
    'no-new-wrappers': 'warn',
    'no-nonoctal-decimal-escape': 'warn',
    'no-octal': 'warn',
    'no-octal-escape': 'warn',
    'no-param-reassign': 'off',
    'no-proto': 'warn',
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
    'no-redeclare': 'off',
    'no-restricted-properties': 'off',
    'no-return-assign': 'off',
    'no-return-await': 'off',
    'no-script-url': 'warn',
    'no-self-assign': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'warn',
    'no-throw-literal': 'warn',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'warn',
    'no-unused-labels': 'off',
    'no-useless-call': 'off',
    'no-useless-catch': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-return': 'warn',
    'no-void': 'warn',
    'no-warning-comments': 'off',
    'no-with': 'error',
    'prefer-named-capture-group': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-regex-literals': 'off',
    'radix': 'error',
    'require-await': 'off',
    'require-unicode-regexp': 'off',
    'vars-on-top': 'off',
    'wrap-iife': 'off',
    'yoda': 'off',


    // https://eslint.org/docs/rules/#strict-mode
    'strict': 'off',


    // https://eslint.org/docs/rules/#variables
    'init-declarations': 'off',
    'no-delete-var': 'off',
    'no-label-var': 'off',
    'no-restricted-globals': 'off',
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
    'no-shadow': ['off'],
    'no-shadow-restricted-names': ['error'],
    'no-undef': 'warn',
    'no-undef-init': 'warn',
    'no-undefined': 'off',
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': 'off',


    // https://eslint.org/docs/rules/#stylistic-issues
    'array-bracket-newline': ['warn', 'consistent'],
    'array-bracket-spacing': ['warn', 'never'],
    'array-element-newline': 'off',
    'block-spacing': ['warn', 'always'],

    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
    'brace-style': 'off',

    'camelcase': 'off',
    'capitalized-comments': 'off',
    'comma-dangle': ['warn', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
    'comma-spacing': ['off'],
    'comma-style': ['warn'],
    'computed-property-spacing': ['warn'],
    'consistent-this': 'off',
    'eol-last': ['warn'],
    'func-call-spacing': ['warn'],
    'func-name-matching': ['warn'],
    'func-names': ['warn'],
    'func-style': 'off',
    'function-call-argument-newline': ['warn', 'consistent'],
    'function-paren-newline': ['warn', 'consistent'],
    'id-denylist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'implicit-arrow-linebreak': ['warn'],
    'indent': ['warn', 2],
    'jsx-quotes': ['warn', 'prefer-single'],
    'key-spacing': ['warn', {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    }],
    'keyword-spacing': ['warn'],
    'line-comment-position': 'off',
    // 'linebreak-style': ['warn', 'unix'],
    'lines-around-comment': 'off',
    'lines-between-class-members': ['warn'],
    'max-depth': ['warn', 3],
    'max-len': ['warn', {
      code: 120,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    'max-lines': ['warn', 300],
    'max-lines-per-function': ['warn', 200],
    'max-nested-callbacks': ['warn', 2],
    'max-params': ['warn', 3],
    'max-statements': 'off',
    'max-statements-per-line': ['warn', {max: 1}],
    'multiline-comment-style': ['warn', 'starred-block'],
    'multiline-ternary': 'off',
    'new-cap': 'warn',
    'new-parens': 'warn',
    'newline-per-chained-call': 'warn',
    'no-array-constructor': 'off',
    'no-bitwise': 'warn',
    'no-continue': 'off',
    'no-inline-comments': 'off',
    'no-lonely-if': 'warn',
    'no-mixed-operators': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-multi-assign': 'off',
    'no-multiple-empty-lines': 'warn',
    'no-negated-condition': 'off',
    'no-nested-ternary': 'warn',
    'no-new-object': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-tabs': 'off',
    'no-ternary': 'off',
    'no-trailing-spaces': 'warn',
    'no-underscore-dangle': ['warn', {
      enforceInMethodNames: true,
      allowFunctionParams: true,
    }],
    'no-unneeded-ternary': 'warn',
    'no-whitespace-before-property': 'warn',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': ['warn', {consistent: true}],
    'object-curly-spacing': ['warn', 'never'],
    'object-property-newline': ['warn', {
      allowAllPropertiesOnSameLine: true,
    }],
    'one-var': ['warn', 'never'],
    'one-var-declaration-per-line': ['warn', 'always'],
    'operator-assignment': ['warn', 'always'],
    'operator-linebreak': ['warn', 'before'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': ['warn',
      {blankLine: 'always', prev: '*', next: 'case'},
      {blankLine: 'never', prev: 'switch', next: 'case'},
      {blankLine: 'always', prev: '*', next: 'function'},
      {blankLine: 'always', prev: 'function', next: '*'}],
    'prefer-exponentiation-operator': 'warn',
    'prefer-object-spread': 'off',
    'quote-props': ['warn', 'consistent-as-needed'],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'semi-spacing': ['error'],
    'semi-style': ['error', 'last'],
    'sort-keys': 'off',
    'sort-vars': 'off',
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'never'],
    'space-in-parens': ['warn', 'never'],
    'space-infix-ops': ['warn'],
    'space-unary-ops': 'warn',
    'spaced-comment': 'off',
    'switch-colon-spacing': ['warn', {
      after: true,
      before: false,
    }],
    'template-tag-spacing': ['warn', 'never'],
    'unicode-bom': 'off',
    'wrap-regex': 'off',


    // https://eslint.org/docs/rules/#ecmascript-6
    'arrow-body-style': 'off',
    'arrow-parens': ['warn', 'always'],
    'arrow-spacing': ['warn', {before: true, after: true}],
    'constructor-super': 'warn',
    'generator-star-spacing': 'off',
    'no-class-assign': 'error',
    'no-confusing-arrow': 'warn',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-duplicate-imports.md
    'no-duplicate-imports': 'off',
    'no-new-symbol': 'off',
    'no-restricted-exports': 'off',
    'no-restricted-imports': 'off',
    'no-this-before-super': 'off',
    'no-useless-computed-key': 'warn',
    'no-useless-constructor': 'off',
    'no-useless-rename': 'warn',
    'no-var': 'warn',
    'object-shorthand': ['warn', 'always'],
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-destructuring': 'off',
    'prefer-numeric-literals': 'off',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    'require-yield': 'warn',
    'rest-spread-spacing': ['warn', 'never'],
    'sort-imports': 'off',
    'symbol-description': 'off',
    'template-curly-spacing': ['warn', 'never'],
    'yield-star-spacing': ['warn', {
      before: false,
      after: true,
    }],


    // https://github.com/yannickcr/eslint-plugin-react
    'react/boolean-prop-naming': ['warn', {rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+'}],
    'react/button-has-type': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/forbid-component-props': 'off',
    'react/forbid-dom-props': 'off',
    'react/forbid-elements': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/no-access-state-in-setstate': 'warn',
    'react/no-adjacent-inline-elements': 'off',
    'react/no-array-index-key': 'off',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'warn',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'warn',
    'react/no-is-mounted': 'warn',
    'react/no-multi-comp': 'off', // TODO: Enable in future!!!!
    'react/no-redundant-should-component-update': 'warn',
    'react/no-render-return-value': 'error',
    'react/no-set-state': 'off',
    'react/no-string-refs': 'warn',
    'react/no-this-in-sfc': 'warn',
    'react/no-typos': 'warn',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': 'warn',
    'react/no-unused-prop-types': 'off',
    'react/no-unused-state': 'warn',
    'react/no-will-update-set-state': 'warn',
    'react/prefer-es6-class': ['warn', 'always'],
    'react/prefer-read-only-props': ['warn'],
    'react/prefer-stateless-function': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'error',
    'react/require-default-props': 'off',
    'react/require-optimization': 'off',
    'react/require-render-return': 'warn',
    'react/self-closing-comp': 'error',
    'react/sort-comp': 'off',
    'react/sort-prop-types': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/style-prop-object': 'warn',
    'react/void-dom-elements-no-children': 'warn',
    'react/jsx-boolean-value': ['warn', 'always'],
    'react/jsx-child-element-spacing': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-curly-spacing': ['warn', {
      when: 'never',
      children: {
        when: 'always',
      },
    }],
    'react/jsx-equals-spacing': ['warn', 'never'],
    'react/jsx-filename-extension': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-fragments': ['warn', 'element'],
    'react/jsx-handler-names': 'off',
    'react/jsx-indent': ['warn', 2, {checkAttributes: true, indentLogicalExpressions: true}],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-key': ['warn', {
      checkFragmentShorthand: true,
    }],
    'react/jsx-max-depth': ['warn', {max: 5}],
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-newline': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-comment-textnodes': ['warn'],
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-no-duplicate-props': ['warn', {ignoreCase: true}],
    'react/jsx-no-literals': 'off',
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': ['warn'],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-pascal-case': ['error'],
    'react/jsx-props-no-multi-spaces': ['warn'],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-default-props': 'off',
    'react/jsx-sort-props': 'off',
    'react/jsx-space-before-closing': ['warn'],
    'react/jsx-tag-spacing': ['warn'],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/jsx-wrap-multilines': 'warn',


    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/array-type': ['warn', {default: 'array-simple'}],
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-tslint-comment': 'off',
    '@typescript-eslint/brace-style': ['warn'],
    '@typescript-eslint/class-literal-property-style': 'off',
    '@typescript-eslint/comma-dangle': ['off'],
    '@typescript-eslint/comma-spacing': ['warn'],
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/consistent-type-imports': ['warn', {
      prefer: 'type-imports',
    }],
    '@typescript-eslint/default-param-last': ['warn'],
    '@typescript-eslint/dot-notation': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-redeclare': 'off', // Doesn't work with type+namespace
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-duplicate-imports': ['warn'],

    // https://github.com/benmosher/eslint-plugin-import
    'import/no-default-export': ['warn'],
    'import/order': 'off',

    'simple-import-sort/imports': ['warn', {
      groups: [
        ['\\w'],
        ['src'],
        ['../'],
        ['./'],
      ],
    }],
    'simple-import-sort/exports': 'warn',

    'replace-relative-imports/replace': ['warn', {
      aliases: [
        {name: 'src', path: './src'},
      ],
    }],
  },
};
