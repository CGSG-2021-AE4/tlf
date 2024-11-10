// Loades HTML through GET request

// Global variable for loading state
var loadingPages = 0; // In case nothing is need to be loaded

// Converts tags: `<load src="..."></load>` into html from ... file
export async function loadHTML(onPagesLoad: () => void ) {
  var elements = $("load");
  
  for (var i = 0; i < elements.length; i++) {
    var e = elements[i];
    var file = e.getAttribute("src");
    
    if (file) {
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            var newE = $.parseHTML(this.responseText);
            e.replaceWith(...newE);
            loadHTML(onPagesLoad); // Again
          }
          if (this.status == 404) {
            e.innerHTML = "Page not found.";
          }
          loadingPages -= 1;
          if (loadingPages == 0) {
            onPagesLoad();
          }
        }
      }
      req.open("GET", file, true);
      req.send();
      loadingPages += 1;
      return; // We will call this function again after we change it
    }
  }
}

// Returns true if there is no pages to load
export function loaded(): boolean {
  return loadingPages == 0;
}

// Amount of pages waiting to load
export function count(): number {
  return loadingPages;
}
