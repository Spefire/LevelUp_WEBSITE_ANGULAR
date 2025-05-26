import eslint from '@eslint/js';

import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts'],
  extends: [
    // Apply the recommended core rules
    eslint.configs.recommended,
    // Apply the recommended TypeScript rules
    ...tseslint.configs.recommended,
    // Optionally apply stylistic rules from typescript-eslint that improve code consistency
    ...tseslint.configs.stylistic,
    // Apply the recommended Angular rules
    ...angular.configs.tsRecommended,
  ],
  rules: {
    // Angular rules
    '@angular-eslint/component-class-suffix': [
      'error',
      {
        suffixes: ['Component', 'Modal', 'Page'],
      },
    ],
    // Typescript rules
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'off',
        },
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          // Decorated
          'public-decorated-get',
          'protected-decorated-get',
          'private-decorated-get',
          'decorated-get',

          'public-decorated-set',
          'protected-decorated-set',
          'private-decorated-set',
          'decorated-set',

          'public-decorated-field',
          'protected-decorated-field',
          'private-decorated-field',
          'decorated-field',

          'public-decorated-method',
          'protected-decorated-method',
          'private-decorated-method',
          'decorated-method',

          // Fields
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          '#private-static-field',

          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          '#private-instance-field',

          'public-abstract-field',
          'protected-abstract-field',

          'public-field',
          'protected-field',
          'private-field',
          '#private-field',

          'static-field',
          'instance-field',
          'abstract-field',

          'field',

          // Getters
          'public-static-get',
          'protected-static-get',
          'private-static-get',
          '#private-static-get',

          'public-instance-get',
          'protected-instance-get',
          'private-instance-get',
          '#private-instance-get',

          'public-abstract-get',
          'protected-abstract-get',

          'public-get',
          'protected-get',
          'private-get',
          '#private-get',

          'static-get',
          'instance-get',
          'abstract-get',

          'get',

          // Setters
          'public-static-set',
          'protected-static-set',
          'private-static-set',
          '#private-static-set',

          'public-instance-set',
          'protected-instance-set',
          'private-instance-set',
          '#private-instance-set',

          'public-abstract-set',
          'protected-abstract-set',

          'public-set',
          'protected-set',
          'private-set',
          '#private-set',

          'static-set',
          'instance-set',
          'abstract-set',

          'set',

          // Index signature
          'signature',
          'call-signature',

          // Static initialization
          'static-initialization',

          // Constructors
          'public-constructor',
          'protected-constructor',
          'private-constructor',

          'constructor',

          // Methods
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          '#private-static-method',

          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          '#private-instance-method',

          'public-abstract-method',
          'protected-abstract-method',

          'public-method',
          'protected-method',
          'private-method',
          '#private-method',

          'static-method',
          'instance-method',
          'abstract-method',

          'method',
        ],
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],

    // ESLint rules
    'arrow-spacing': 'error',
    'block-spacing': ['error', 'always'],
    'keyword-spacing': ['error', { after: true, before: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'no-console': [
      'error',
      {
        allow: ['log', 'error'],
      },
    ],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: 'error',
    'space-before-blocks': ['error', 'always'],
    'spaced-comment': ['error', 'always'],
  },
});
