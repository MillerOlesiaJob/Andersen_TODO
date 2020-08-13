import { INVISIBLE, SORT_DOWN, SORT_UP, SORT_DATE, SORT_TEXT } from './constants.js'
import { storage } from './Storage.js';
import { observer } from './Observer.js';

class SortButtons {
  constructor() {
    this.sortBtn = document.getElementById('sortBtn');
    this.dateBtn = document.getElementById('sortDate');
    this.textBtn = document.getElementById('sortText');
    this.buttonGroup = document.querySelector('.sort__buttons');
    this.buttonOrderGroup = document.querySelector('.sort-icon-group');

    this.menuIsOpen = false;
    this.sortModeDirection = SORT_DOWN;
    this.sortModeContent = SORT_TEXT;
    this.sortedTasks = [];
  }

  setupListeners() {
    this.sortBtn.addEventListener('click', () => {
      this.buttonGroup.classList.toggle(INVISIBLE);
      observer.publish('showTasks', this.tasks);
    })

    this.buttonOrderGroup.addEventListener('click', ({target}) => this.changeOrder(target));
    this.dateBtn.addEventListener('click', () => this.sortByDate());
    this.textBtn.addEventListener('click', () => this.sortByText());
  }

  sortByText() {
    const tasks = storage.getTasks();

    this.sortModeContent = SORT_TEXT;

    const sortedArray = this.sortMode === SORT_UP
      ? tasks.sort((a, b) => a.title > b.title ? 1 : -1)
      : tasks.sort((a, b) => a.title < b.title ? 1 : -1)

    observer.publish('showTasks', sortedArray);
  }

  sortByDate() {
    const tasks = storage.getTasks();

    this.sortModeContent = SORT_DATE;

    const sortedArray = this.sortMode === SORT_UP
      ? tasks.sort((a, b) => a.createDate > b.createDate ? 1 : -1)
      : tasks.sort((a, b) => a.createDate < b.createDate ? 1 : -1)

    observer.publish('showTasks', sortedArray);
  }

  changeOrder(target) {
    if (target.closest('#sortUp')) {
      this.sortMode = SORT_UP;
    }

    if (target.closest('#sortDown')) {
      this.sortMode = SORT_DOWN;
    }

    this.sortModeContent === SORT_DATE ? this.sortByDate() : this.sortByText();
  }
}

export const sortButtons = new SortButtons(); 

