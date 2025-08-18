import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
      plugins: [
        {
          name: 'full-reload-on-html-change',
          configureServer(server) {
            server.watcher.on('change', (file) => {
              if (file.endsWith('.html')) {
                server.ws.send({ type: 'full-reload' });
              }
            });
          },
        },
        react(),
      ],
    });
