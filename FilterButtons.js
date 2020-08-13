import { observer } from './Observer.js';
import { storage } from './Storage.js';

class FilterButtons {
  constructor() {
    this.allBtn = document.getElementById('filterAll');
    this.activeBtn = document.getElementById('filterActive');
    this.completedBtn = document.getElementById('filterCompleted');
    this.clearBtn = document.getElementById('clearCompleted');
  }

  setupListeners() {
    this.allBtn.addEventListener('click', () => this.filterAll());
    this.activeBtn.addEventListener('click', () => this.filterActive());
    this.completedBtn.addEventListener('click', () => this.filterCompleted());
    this.clearBtn.addEventListener('click', () => this.clearCompleted());
  }

  filterAll() {
    const tasks = storage.getTasks();

    observer.publish('showTasks', tasks);
  }

  filterActive() {
    const tasks = storage.getTasks().filter(task => !task.isDone)

    observer.publish('showTasks', tasks);
  }

  filterCompleted() {
    const tasks = storage.getTasks().filter(task => task.isDone)

    observer.publish('showTasks', tasks);
  }

  clearCompleted() {
    const tasks = storage.getTasks().filter(task => !task.isDone)

    storage.setTasks(tasks);
    observer.publish('showTasks', storage.getTasks());
  }
}

export const filterButtons = new FilterButtons();
