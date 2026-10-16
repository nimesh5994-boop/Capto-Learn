import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PGlite (local dev database) loads its WASM + data files from its own package directory at runtime.
  // @react-pdf/renderer reads its built-in font files from its package at runtime (research reports).
  serverExternalPackages: ["@electric-sql/pglite", "@react-pdf/renderer"],
};

export default nextConfig;
