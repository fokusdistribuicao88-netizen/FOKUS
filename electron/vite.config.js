{
  "extends": "../../vite.config.js",
  "build": {
    "outDir": "../dist-electron",
    "lib": {
      "entry": "main.js",
      "formats": ["es"]
    },
    "rollupOptions": {
      "external": ["electron"]
    }
  }
}
