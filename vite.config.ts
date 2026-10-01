// @lovable.dev/vite-tanstack-config already provides the TanStack Start, React,
// Tailwind, tsconfig paths, sandbox preview, and error-diagnostics integration.
// Do not register those plugins again here, or the preview can break with duplicates.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
