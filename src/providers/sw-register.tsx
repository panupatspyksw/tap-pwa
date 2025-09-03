// src/providers/sw-register.tsx
'use client'
import { useEffect } from 'react'

export default function SWRegister() {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(console.error)
        }
    }, [])
    return null
}
