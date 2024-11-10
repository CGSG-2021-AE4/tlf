const esbuild = require("esbuild")
const { loadHTML } = require("./src/utils/node_loader");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist",
    bundle: true,
    minify: false,
    plugins: [],
    inject: ['./src/utils/jquery_inject.js'],
  })
  .then(() => console.log("JS Build completed."))
  .catch(()=> process.exit(1));

// Compile html (selfmade)
loadHTML("./static/html/index.html", "./dist/index.html").then(() => console.log("HTML Build completed."));
