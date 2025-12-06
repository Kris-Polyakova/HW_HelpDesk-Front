import { Form } from "./Form";

export class DeleteForm extends Form {
  constructor(formSelector, api) {
    super(formSelector, api);
    this.okBtn.addEventListener("click", (e) => {
      this.okHandler(e);
    });
  }

  setId(id) {
    this.ticketId = id;
  }

  okHandler() {
    this.api.deleteTicket(this.ticketId);
    this.hide();
  }
}
