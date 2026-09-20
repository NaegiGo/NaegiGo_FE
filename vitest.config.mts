import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // next.config.ts의 turbopack SVGR 설정과 같은 옵션을 써서
  // 테스트 환경에서도 실제와 동일하게 SVG를 컴포넌트로 불러온다.
  plugins: [
    react(),
    svgr({
      svgrOptions: { replaceAttrValues: { "#1D1D1F": "currentColor" } },
      include: "**/*.svg",
    }),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    pool: "threads",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
