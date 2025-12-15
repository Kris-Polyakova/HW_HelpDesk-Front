export class Form {
  constructor(formSelector, api) {
    this.form = document.querySelector(formSelector);
    this.container = this.form.parentElement;
    this.cancelBtn = this.form.querySelector(".cancel-btn");
    this.okBtn = this.form.querySelector(".ok-btn");
    this.api = api;
  }

  show() {
    this.container.classList.remove("_hidden");
    this.container.addEventListener("click", this.clickListener);
  }

  hide() {
    this.container.classList.add("_hidden");
    this.container.removeEventListener("click", this.clickListener);
    this.form.reset();
  }

  clickListener = (e) => {
    if (e.target === this.cancelBtn) {
      this.hide();
    } else if (!e.target.closest(".form")) {
      this.hide();
    }
  };
}
