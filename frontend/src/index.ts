import $ from "jquery";
import { loaded } from "./load";
import { setBlur } from "./background";
import { PageName } from "./page";


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
  setBlur(false);
  $(".pageLoader").addClass("hidden");

  //var pageName: PageName = "unknown";

  console.log(window.location.pathname)
}

function waitLoadAndMain() {
 if (!loaded())
   window.setTimeout(waitLoadAndMain, 100);
 else
   main();
}

waitLoadAndMain()