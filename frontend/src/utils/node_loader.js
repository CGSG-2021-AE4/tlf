const fs = require('fs').promises;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { parse } =  require('node-html-parser');

// HTML Loader to use in compile time
// !!! Tag syntax
// <load src="..."></load>

// Load

// Loads all tags
// Returns success or not
async function loadHTML(inputFileName, outputFileName) {
  const data = await fs.readFile(inputFileName, 'utf8');
  const document = parse(data);

  await loadTags(document);

  // Save to output file
  // ...
  await fs.writeFile(outputFileName, document.toString());
}

// Load tags from this dom rec
async function loadTags(document) {
  const elements = document.querySelectorAll("load");
  
  for (var i = 0; i < elements.length; i++) {
    const e = elements[i];
    const filename = e.getAttribute("src");
    const data = await fs.readFile(filename, 'utf8');
    const root = parse(data);
    e.replaceWith(root);
    return loadTags(document);
  }
}

module.exports = { loadHTML };