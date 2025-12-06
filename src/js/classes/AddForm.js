import { Form } from "./Form";

export class AddForm extends Form {
  constructor(formSelector, api) {
    super(formSelector, api);
    this.okBtn.addEventListener("click", (e) => {
      this.okHandler(e);
    });
  }

  okHandler() {
    const formData = new FormData(this.form);
    const formDataObj = Object.fromEntries(formData.entries());
    this.api.createTicket(formDataObj);
    this.hide();
  }
}
