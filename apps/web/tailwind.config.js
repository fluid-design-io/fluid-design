const tailwindConfig = require('ui/tailwind.config');
const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
    ...tailwindConfig,
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        extend: {
            ...tailwindConfig.theme.extend,
            fontFamily: {
                ...tailwindConfig.theme.extend.fontFamily,
                inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
                comfortaa: ['var(--font-comfortaa)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                ...tailwindConfig.theme.extend.colors,
                'background-accent': 'hsl(var(--background-accent))',
            },
            screens: {
                'xs': { 'raw': '(min-width: 24rem)' }
            }
        }
    },
    plugins: [
        ...tailwindConfig.plugins,
        require('@tailwindcss/container-queries'),
        require("tailwindcss-animate")
    ]
}