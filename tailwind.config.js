/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@fluid-design/fluid-ui/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        dark: '#222222',
        gray: {
          50: 'rgb(var(--tw-color-gray-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-gray-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-gray-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-gray-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-gray-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-gray-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-gray-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-gray-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-gray-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-gray-900) / <alpha-value>)',
        }
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
      screens: {
        'pointer-hover': { 'raw': '(hover: hover) and (pointer: fine)' },
        'pointer-touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        'prefers-contrast': { 'raw': '(prefers-contrast: more)' },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@fluid-design/fluid-ui/src/plugin')],
};