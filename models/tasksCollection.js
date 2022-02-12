require("colors");
const Task = require("./task");

class TasksCollection {
  _collection = {};

  constructor() {
    this._collection = {};
  }

  get collectionArray() {
    const collectionArray = [];
    Object.keys(this._collection).forEach((task) =>
      collectionArray.push(this._collection[task])
    );

    return collectionArray;
  }

  get collectionObj() {
    return this._collection;
  }

  setTasksCollectionFromArray(tasks = []) {
    tasks.forEach((task) => (this._collection[task.id] = task));
  }

  addTask(description = "") {
    const task = new Task(description);
    this._collection[task.id] = task;
  }

  listAllTasks() {
    const tasks = this.collectionArray;
    let result = "\n";

    if (!tasks) {
      return "All done by now :)".green;
    }

    tasks.forEach((task, i) => {
      result += `${(String(i + 1) + ".").green} ${task.description} :: ${
        task.completedBy ? "Completed".green : "Pending".red
      } \n`;
    });

    console.log(result);
  }

  listTasksByCompletedStatus(completed = true) {
    const tasks = this.collectionArray.filter(
      (task) => !!task.completedBy === completed
    );
    let result = `\nTareas ${completed ? "completadas" : "pendientes"}: \n\n`;

    const notFoundMessage = completed
      ? "\nLo siento, no hay tareas completadas.\n".red
      : "\nGenial, no hay tareas pendientes.\n".green;

    if (tasks.length === 0) {
      console.log(notFoundMessage);
      return;
    }

    tasks.forEach((task, i) => {
      result += `${(String(i + 1) + ".").green} ${task.description}\n`;
    });

    console.log(result);
  }

  setTaskCompletedStatus(id = "", isCompleted = false) {
    if (this._collection[id]) {
      this._collection[id].completedBy = isCompleted
        ? new Date().toISOString()
        : null;
    }
  }

  deleteTask(id = "") {
    if (this._collection[id]) {
      try {
        delete this._collection[id];
        console.log("Tarea borrada".green);
      } catch (err) {
        return err;
      }
    }
    return;
  }
}

module.exports = TasksCollection;
