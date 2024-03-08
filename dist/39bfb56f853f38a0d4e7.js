import ImageWidget from "./field-runner/field-runner";
console.log("start");
document.addEventListener("DOMContentLoaded", () => {
  const widget = new ImageWidget(document.querySelector(".table-main"));
  setInterval(() => {
    widget.deleteActiveRabbit();
    widget.addRandomRabbit();
  }, 1000);
});
export default function demo(value) {
  return `Demo: ${value}`;
}