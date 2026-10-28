import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Temple Night se escribió para un three.js antiguo (usa vUv y sRGBEncoding).
// Le damos la copia three@0.128 que trae ThreeUI; el resto de la web usa el three actual.
const templeThree = (): Plugin => ({
  name: "temple-night-three128",
  enforce: "pre",
  resolveId(source, importer) {
    if (source === "three" && importer?.replace(/\\/g, "/").includes("@designcodeio/threeui/lib-dist/shaders/temple-night")) {
      return this.resolve("three128", importer, { skipSelf: true });
    }
  },
});

export default defineConfig({
  plugins: [templeThree(), react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
