import $ from "jquery";
import { loaded, loadHTML } from "./load";
import { setBlur } from "./background";
import { Page, PageName } from "./pages/page";

import { PageManager } from "./pages/page_manager";


// $("button.SetBlur").on("click", function() {
  //   isBlurred = !isBlurred;
  //   setBlur(isBlurred);
  // });
  
  // $("button.SetPath").on("click", function() {
    //   var page = "hihih";
    //   window.history.replaceState({}, page + " page", page);
    // });

function main() {
  console.log("Start");
  
  // Remove loading

  console.log(window.location.pathname)

  var mng = new PageManager();
}

loadHTML(main);