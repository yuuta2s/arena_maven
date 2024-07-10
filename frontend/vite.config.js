const path = require("path");
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import resolve from "@rollup/plugin-node-resolve"; // Plugin pour résoudre les dépendances des modules
import commonjs from "@rollup/plugin-commonjs"; // Plugin pour convertir les modules CommonJS en ES6

// https://vitejs.dev/config/
export default defineConfig({
 
  build: {
    rollupOptions: {
      external: ["build.rollupOptions.external"], // Remplacez 'module-name' par le nom du module à externaliser
    },
  },
  plugins: [
    react(),
    resolve(), // Résout les dépendances des modules
    commonjs(), // Convertit les modules CommonJS en ES6
  ],
  input: "src/main.js", // Point d'entrée de votre application
  output: {
    file: "dist/bundle.js", // Fichier de sortie après le bundling
    format: "es", // Format de module (ES6)
    sourcemap: true, // Générer les sourcemaps pour le débogage
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      '../../': path.resolve(__dirname, 'src/'),
    },
  },
  assetsInclude: ["**/*.PNG"],
});
