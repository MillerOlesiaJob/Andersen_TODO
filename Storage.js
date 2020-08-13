class Storage {
  constructor() {
    this.tasks = [];
  }

  getTasks() {
    return this.tasks;
  }

  setTask(task) {
    this.tasks.push(task)
  }
}

export const storage = new Storage();