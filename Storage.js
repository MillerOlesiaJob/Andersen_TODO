class Storage {
  constructor() {
    this.tasks = [];
  }

  getTasks() {
    return this.tasks;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
}

export const storage = new Storage();
