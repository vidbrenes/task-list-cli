const { v4: uuidv4 } = require("uuid");

class Task {
  // PUBLIC FIELDS
  id = "";
  description = "";
  completedBy = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
  }
}

module.exports = Task;
