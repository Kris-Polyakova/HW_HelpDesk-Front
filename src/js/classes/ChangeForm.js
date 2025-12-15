import { Form } from "./Form";

export class ChangeForm extends Form {
  constructor(formSelector, api) {
    super(formSelector, api);
    this.nameInput = this.form.querySelector(".short-description-input");
    this.descriptionInput = this.form.querySelector(".full-description-input");
    this.okBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.okHandler(e);
    });
  }

  setData(id, name, description) {
    this.ticketId = id;
    this.nameInput.value = name;
    this.descriptionInput.textContent = description;
  }

  okHandler() {
    const formData = new FormData(this.form);
    const formDataObj = Object.fromEntries(formData.entries());
    this.api.updateTicket(this.ticketId, formDataObj);
    this.hide();
  }
}
