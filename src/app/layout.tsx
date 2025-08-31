// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@mantine/core/styles.css'
import './globals.css'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import ThemeProvider from '@/providers/theme-provider'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'TAP – Timing App for Productivity',
    description:
        'TAP is a simple productivity app designed to help you track focus time, manage daily routines, and build better habits through clear and useful insights.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' {...mantineHtmlProps} className={inter.variable}>
            <head>
                <ColorSchemeScript />
            </head>
            <body className='antialiased bg-transparent'>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    )
}
