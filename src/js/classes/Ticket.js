export class Ticket {
  constructor(changeForm, deleteForm, api) {
    this.container = document.querySelector(".tickets-container");
    this.changeForm = changeForm;
    this.deleteForm = deleteForm;
    this.api = api;
    this.body = document.createElement("div");
  }

  create(id, name, description, status, created) {
    this.id = id;
    this.name = name;
    this.description = description;

    this.body.dataset.id = id;
    this.body.classList.add("ticket");

    const shortView = document.createElement("div");
    shortView.classList.add("short-ticket");
    this.body.append(shortView);

    this.doneBtn = document.createElement("button");
    this.doneBtn.type = "button";
    this.doneBtn.classList.add("btn");
    if (status) this.doneBtn.classList.add("btn_checked");
    shortView.append(this.doneBtn);

    const shortDescContainer = document.createElement("div");
    shortDescContainer.classList.add("short-description-container");
    shortView.append(shortDescContainer);

    this.shortDescription = document.createElement("span");
    this.shortDescription.textContent = name;
    shortDescContainer.append(this.shortDescription);

    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");
    shortView.append(dateContainer);

    this.date = document.createElement("span");
    this.date.textContent = created;
    dateContainer.append(this.date);

    this.editBtn = document.createElement("button");
    this.editBtn.type = "button";
    this.editBtn.textContent = "✎";
    this.editBtn.classList.add("btn", "edit-btn");
    shortView.append(this.editBtn);

    this.deleteBtn = document.createElement("button");
    this.deleteBtn.type = "button";
    this.deleteBtn.textContent = "✖";
    this.deleteBtn.classList.add("btn", "delete-btn");
    shortView.append(this.deleteBtn);

    const fullView = document.createElement("div");
    fullView.classList.add("full-ticket", "_hidden");
    this.body.append(fullView);

    this.fullDescription = document.createElement("span");
    this.fullDescription.textContent = description;
    fullView.append(this.fullDescription);

    this.container.append(this.body);
  }

  activate() {
    this.body.addEventListener("click", (e) => {
      this._handlerClick(e);
    });
  }

  _handlerClick(event) {
    if (event.target === this.doneBtn) {
      if (this.doneBtn.classList.contains("btn_checked")) {
        this.api.toggleStatus(this.id, true);
      } else {
        this.api.toggleStatus(this.id, false);
      }
    } else if (event.target === this.editBtn) {
      this.changeForm.show();
      this.changeForm.setData(this.id, this.name, this.description);
    } else if (event.target === this.deleteBtn) {
      this.deleteForm.show();
      this.deleteForm.setId(this.id);
    } else {
      if (this.fullDescription.parentElement.classList.contains("_hidden")) {
        this.fullDescription.parentElement.classList.remove("_hidden");
      } else {
        this.fullDescription.parentElement.classList.add("_hidden");
      }
    }
  }
}
