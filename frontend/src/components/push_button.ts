export type ChangeCallBack = (isPushed: boolean) => void;

export function SetButtonValue(el: JQuery, value: boolean) {
  if (value)
    el.addClass("active");
  else
    el.removeClass("active");
}

// Do not return just callback because I also need to set initial value
export function BindPushButton(el: JQuery, initialValue: boolean, callback: ChangeCallBack) {
  SetButtonValue(el, initialValue); // Initial state

  // On click event
  el.on("click", (e: JQuery.ClickEvent) => {
    if ($(e.target).hasClass("active")) {
     callback(false);
     $(e.target).removeClass("active");
    } else {
     callback(true);
     $(e.target).addClass("active");
    }
  });
}