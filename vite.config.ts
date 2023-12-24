import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const manifest = defineManifest({
    manifest_version: 3,
    name: "Open Bookmarks",
    version: "1.0.0",
    options_page: "option.html",
    permissions: ["bookmarks"],
    action: {
      default_popup: "index.html",
    },
  });

export default defineConfig({
    plugins: [react(), crx({ manifest })],
});