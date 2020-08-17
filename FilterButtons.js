import { observer } from './Observer.js';
import { storage } from './Storage.js';
import { ACTIVE_LINK, FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from './constants.js';

class FilterButtons {
  constructor() {
    this.linksArray = document.querySelectorAll('.filter__btn');
  }

  setupListeners() {
    const allBtn = document.getElementById('filterAll');
    const activeBtn = document.getElementById('filterActive');
    const completedBtn = document.getElementById('filterCompleted');
    const clearBtn = document.getElementById('clearCompleted');

    allBtn.addEventListener('click', () => this.filterAll());
    activeBtn.addEventListener('click', () => this.filterActive());
    completedBtn.addEventListener('click', () => this.filterCompleted());
    clearBtn.addEventListener('click', () => this.clearCompleted());
    Array.from(this.linksArray).forEach(link => link.addEventListener('click', () => this.makeLinkActive(link)));
  }

  filterAll() {
    const tasks = storage.getTasks(FILTER_ALL);

    observer.publish('showTasks', tasks);
  }

  filterActive() {
    const tasks = storage.getTasks(FILTER_ACTIVE);

    observer.publish('showTasks', tasks);
  }

  filterCompleted() {
    const tasks = storage.getTasks(FILTER_COMPLETED);

    observer.publish('showTasks', tasks);
  }

  clearCompleted() {
    const tasks = storage.getTasks().filter(task => !task.isDone)

    storage.setTasks(tasks);
    observer.publish('showTasks', storage.getTasks());
  }

  makeLinkActive(link) {
    Array.from(this.linksArray).forEach(link => link.classList.remove(ACTIVE_LINK));
    link.classList.add(ACTIVE_LINK);
  }
}

export const filterButtons = new FilterButtons();
