import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: './',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                menu: resolve(__dirname, 'src/menu.html'),
                shop: resolve(__dirname, 'src/shop.html'),
                gallery: resolve(__dirname, 'src/gallery.html'),
                contact: resolve(__dirname, 'src/contact.html'),
            },
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    },
    server: {
        port: 5173,
        open: true,
    },
})
