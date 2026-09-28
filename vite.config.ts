// @lovable.dev/vite-tanstack-config already provides the TanStack Start, React,
// Tailwind, tsconfig paths, sandbox preview, and error-diagnostics integration.
// Do not register those plugins again here, or the preview can break with duplicates.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Use the project's SSR/server wrapper instead of generating a separate
    // server entry. This keeps Lovable's preview and TanStack Start aligned.
    server: { entry: "server" },
  },
});
