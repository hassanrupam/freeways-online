import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extend Next.js core web vitals and TypeScript rules
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
  // Disable the 'prefer-const' rule
  {
    rules: {
      'prefer-const': 'off',
        // Disable the following TypeScript-specific rules:
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
