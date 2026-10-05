import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // The real "server-only" package throws unconditionally outside a
      // Next.js bundler — vitest runs plain Node, so it needs a no-op stand-in
      // to unit-test server-only modules at all.
      "server-only": path.resolve(__dirname, "src/lib/testStubs/serverOnly.ts"),
    },
  },
});
