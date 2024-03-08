import TicketsWidget from "./ticket-widjet/ticket-widjet";



document.addEventListener("DOMContentLoaded", () => {

  // prepare UI interface to call widget
  const ticketWidjet = new TicketsWidget(document.querySelector(".container"));

  ticketWidjet.start();
  ticketWidjet.setHandlers();

});
