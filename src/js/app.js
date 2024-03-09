import TicketsWidget from "./ticket-widjet/ticket-widjet";

document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".container");
  const ticketsWidget = new TicketsWidget(container)
  ticketsWidget.start();
});
