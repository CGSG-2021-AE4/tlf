const esbuild = require("esbuild")

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist",
    bundle: true,
    minify: false,
    plugins: [],
  })
  .then(() => console.log("Build completed."))
  .catch(()=> process.exit(1));