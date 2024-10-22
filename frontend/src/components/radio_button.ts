import $ from "jquery";

export type ChangeCallBack = (index: number) => void;
export type RadioButtons = JQuery[];

export function SetRadioButtonValue(buttons: RadioButtons, value: number) {
  // Not efficient function because I do not have active button index
  // So I have to reset all of them
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].removeClass("active");
  }
  buttons[value].addClass("active");
}

// Do not return just callback because I also need to set initial value
export function BindRadioButton(buttons: RadioButtons, initialIndex: number, callback: ChangeCallBack) {
  const initial = Math.min(Math.max(initialIndex, 0), buttons.length - 1); // Safe
  SetRadioButtonValue(buttons, initial); // Not efficient way but it is made once and guarantees that there will be no errors

  var current = buttons[initial];

  // On click event
  for (var i = 0; i < buttons.length; i++) {
    const index = i;
    buttons[i].on("click", () => {
      current.removeClass("active");
      current = buttons[index];
      current.addClass("active");
      callback(index);
    });
  }
}