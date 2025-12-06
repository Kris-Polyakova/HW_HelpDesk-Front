import { AddForm } from "./AddForm";
import { ChangeForm } from "./ChangeForm";
import { DeleteForm } from "./DeleteForm";
import { HelpDeskAPI } from "./HelpDeskAPI";
import { Ticket } from "./Ticket";

export class Desk {
  constructor() {
    this.desk = document.querySelector(".help-desk");
    this.addTicketBtn = this.desk.querySelector(".add-btn");
    this.api = new HelpDeskAPI("https://hw-helpdesk-back.onrender.com");
    this.addForm = new AddForm(".add-ticket-form", this.api);
    this.changeForm = new ChangeForm(".change-ticket-form", this.api);
    this.deleteForm = new DeleteForm(".delete-ticket-form", this.api);
  }

  init() {
    this.loadTickets();
    this.addTicketBtn.addEventListener("click", () => {
      this.addForm.show();
    });
  }

  async loadTickets() {
    let data = [];
    try {
      data = await this.api.getAllTickets();
    } catch (error) {
      console.log(`${error}`);
    } finally {
      this.createLoadedTickets(data);
    }
  }

  createLoadedTickets(data) {
    data.forEach((ticket) => {
      const newTicket = new Ticket(this.changeForm, this.deleteForm, this.api);
      newTicket.create(
        ticket.id,
        ticket.name,
        ticket.description,
        ticket.status,
        ticket.created,
      );
      newTicket.activate();
    });
  }
}
