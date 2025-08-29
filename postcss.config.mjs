const config = {
    plugins: {
        '@tailwindcss/postcss': {}, // Tailwind
        'postcss-preset-mantine': {}, // Mantine preset
        'postcss-simple-vars': {
            // Mantine breakpoints
            variables: {
                'mantine-breakpoint-xs': '36em',
                'mantine-breakpoint-sm': '48em',
                'mantine-breakpoint-md': '62em',
                'mantine-breakpoint-lg': '75em',
                'mantine-breakpoint-xl': '88em',
            },
        },
    },
}

export default config
