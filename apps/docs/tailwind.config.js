const tailwindConfig = require('ui/tailwind.config');
/** @type {import('tailwindcss').Config} */
module.exports = {
    ...tailwindConfig,
    content: [
        './src/**/*.{js,jsx,ts,tsx,md,mdx}'
    ],
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [
        ...tailwindConfig.plugins,
        require('@tailwindcss/typography'),
        require("tailwindcss-animate")
    ]
}