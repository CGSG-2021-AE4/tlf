import $ from "jquery";
import { loaded } from "./load";
import { setBlur } from "./background";

console.log("SDFSDFSDF");
var isBlurred: boolean = false;

$("button.SetBlur").on("click", function() {
  isBlurred = !isBlurred;
  setBlur(isBlurred);
});

$("button.SetPath").on("click", function() {
  var page = "hihih";
  window.history.replaceState({}, page + " page", page);
});
//
//function waitLoadAndMain() {
//  if (!loaded())
//    window.setTimeout(waitLoadAndMain, 50);
//  else
//    main();
//}
//waitLoadAndMain()