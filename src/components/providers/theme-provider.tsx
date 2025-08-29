import { MantineProvider, createTheme } from '@mantine/core'

const theme = createTheme({
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
    headings: { fontFamily: 'var(--font-inter), system-ui, sans-serif' },
    components: {
        Input: {
            styles: {
                input: {
                    // padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #373A41',
                    background: '#0C0E12',
                    boxShadow: '0 1px 2px 0 rgba(255, 255, 255, 0)',
                    color: '#E6E8EB',
                },
            },
        },
        // (optional) ensure Select follows the same look
        Select: {
            styles: {
                input: {
                    // padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #373A41',
                    background: '#0C0E12',
                    boxShadow: '0 1px 2px 0 rgba(255, 255, 255, 0)',
                    color: '#E6E8EB',
                },
            },
        },
    },
})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return <MantineProvider theme={theme}>{children}</MantineProvider>
}
