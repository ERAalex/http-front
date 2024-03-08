

export default class ApiServerCalls {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  

    sendXHR(method, query, type) {
        const xhr = new XMLHttpRequest();

        if (method === 'GET') {
          const baseUrl = `${this.baseUrl}?method=${query}`;
          xhr.open(method, baseUrl, false);
          xhr.send();

        } else if (method === 'POST') {
          const baseUrl = `${this.url}?method=${type}`;
          xhr.open(method, baseUrl, false);
          xhr.send(query);

        } else if (method === 'DELETE') {
          const baseUrl = `${this.baseUrl}?method=deleteTicket&id=${query}`;
          xhr.open(method, baseUrl, false);
          xhr.send();
        }
        return (xhr.responseText);
      }

      init() {
        const result = this.getTickets();
        return result

      }

      getTickets() {
        const result = JSON.parse((this.sendXHR('GET', 'allTickets')));
        this.tickets = result;
        return this.tickets
      }


}
