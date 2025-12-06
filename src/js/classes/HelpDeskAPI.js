export class HelpDeskAPI {
  constructor(url) {
    this.url = url;
  }

  async getAllTickets() {
    const response = await fetch(`${this.url}?method=allTickets`);
    if (!response.ok) throw new Error("Failed to fetch tickets");
    return await response.json();
  }

  async createTicket(ticketData) {
    const response = await fetch(`${this.url}?method=createTicket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });
    if (!response.ok) throw new Error("Failed to create ticket");
    location.reload();
    return await response.json();
  }

  async deleteTicket(id) {
    const response = await fetch(`${this.url}?method=deleteById&id=${id}`);
    if (response.status !== 204) throw new Error("Failed to delete ticket");
    location.reload();
    return true;
  }

  async updateTicket(id, updateData) {
    const response = await fetch(`${this.url}?method=updateById&id=${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error("Failed to update ticket");
    location.reload();
    return await response.json();
  }

  async toggleStatus(id, currentStatus) {
    return await this.updateTicket(id, { status: !currentStatus });
  }
}
