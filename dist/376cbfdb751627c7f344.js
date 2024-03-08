import CardWidget from "./card-types/card-types";
import CardForm from "./card-form/card-form";
console.log("start");
document.addEventListener("DOMContentLoaded", () => {
  const widgetCard = new CardWidget(document.querySelector(".card-main-container"));
  widgetCard.cardShow();
  const widgetForm = new CardForm(document.querySelector(".card-form"));
  widgetForm.onKeyPress();
});