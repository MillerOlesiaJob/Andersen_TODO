import { observer } from './Observer.js';
import { storage } from './Storage.js';

class FilterButtons {
  constructor() {
    this.allBtn = document.getElementById('sortAll');
    this.activeBtn = document.getElementById('sortActive');
    this.completedBtn = document.getElementById('sortCompleted');
    this.clearBtn = document.getElementById('clearCompleted');
  }

  setupListeners() {
    this.allBtn.addEventListener('click', () => this.sortAll());
    this.activeBtn.addEventListener('click', () => this.sortActive());
    this.completedBtn.addEventListener('click', () => this.sortCompleted());
    this.clearBtn.addEventListener('click', () => this.clearCompleted());
  }

  sortAll() {
    const tasks = storage.getTasks();

    observer.publish('showTasks', tasks);
  }

  sortActive() {
    const tasks = storage.getTasks().filter(task => !task.isDone)

    observer.publish('showTasks', tasks);
  }

  sortCompleted() {
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
