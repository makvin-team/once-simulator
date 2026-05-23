import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Served behind once-client at /learner/simulator/. Emitting the full
  // prefix in every asset URL (e.g. /learner/simulator/assets/index-abc.js)
  // means assets always route back through the proxy and can never resolve
  // against once-client's origin root. once-client strips the prefix before
  // forwarding, so the files still live at /assets/* inside this container.
  base: '/learner/simulator/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
