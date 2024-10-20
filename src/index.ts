import $ from "jquery";

console.log("SDFSDFSDF");

var isBlurred: boolean = false;

$("button.blur").on("click", function() {
  if (isBlurred) {
    $(".background")
    .css("filter", "none")
    .css("-webkit-filter", "none");
  } else {
    $(".background")
      .css("filter", "blur(var(--blur-r))")
      .css("-webkit-filter", "blur(var(--blur-r))");
  }
  isBlurred = !isBlurred;
});

