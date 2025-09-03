import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'TAP – Tomodoro Application for a Person',
        short_name: 'TAP',
        description:
            'TAP is a simple productivity app designed to help you track focus time, manage daily routines, and build better habits through clear and useful insights',
        start_url: '/',
        display: 'standalone',
        background_color: '#0C0E12',
        theme_color: '#181D27',

        icons: [
            {
                src: '/196.png',
                sizes: '196x196',
                type: 'image/png',
            },
            {
                src: '/512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
