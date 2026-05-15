import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import os from 'node:os';

// OneDrive locks files during sync, breaking esbuild's atomic writes.
// Redirect Vite's dependency cache to %LOCALAPPDATA% (outside OneDrive).
const cacheDir = path.join(os.tmpdir(), 'vite-nutri-eliane');

export default defineConfig({
  plugins: [react()],
  cacheDir,
  server: {
    port: 5173,
    host: true,
    watch: {
      // OneDrive's pseudo-changes generate spurious reloads
      usePolling: false,
    },
  },
});
