import { FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from "./constants.js";

class Storage {
  constructor() {
    this.tasks = [];
    this.filterType = FILTER_ALL;
  }

  getAllTasks() {
    return this.tasks;
  }

  getTasks(filterType) {
    filterType && (this.filterType = filterType);

    switch(this.filterType) {
      case FILTER_ACTIVE: 
        return this.tasks.filter(task => !task.isDone);

      case FILTER_COMPLETED:
        return this.tasks.filter(task => task.isDone);

      case FILTER_ALL:
        return this.tasks;
        
      default:
        return this.tasks;
    }
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
}

export const storage = new Storage();
