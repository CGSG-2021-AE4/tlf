export function setBlur(doBlur: boolean) {
  if (doBlur) {
    $(".background")
    .css("filter", "none")
    .css("-webkit-filter", "none");
  } else {
    $(".background")
      .css("filter", "blur(var(--blur-r))")
      .css("-webkit-filter", "blur(var(--blur-r))");
  }
}