import {
  INVISIBLE,
  SORT_DOWN,
  SORT_UP,
  SORT_DATE,
  SORT_TEXT,
  SORT_BY_TITLE,
  SORT_BY_DATE
} from './constants.js'
import { storage } from './Storage.js';
import { observer } from './Observer.js';

class SortButtons {
  constructor() {
    this.sortModeContent = SORT_TEXT;
  }

  setupListeners() {
    const sortBtn = document.getElementById('sortBtn');
    const dateBtn = document.getElementById('sortDate');
    const textBtn = document.getElementById('sortText');
    const buttonOrderGroup = document.querySelector('.sort-icon-group');
    const searchField = document.getElementById('search');

    sortBtn.addEventListener('click', () => this.showSortWindow());
    buttonOrderGroup.addEventListener('click', ({target}) => this.changeOrder(target));
    dateBtn.addEventListener('click', () => this.sortByDate());
    textBtn.addEventListener('click', () => this.sortByText());
    searchField.addEventListener('keyup', () => this.showSearchResult(searchField.value));
  }

  showSortWindow() {
    const buttonGroup = document.querySelector('.sort__buttons');

    buttonGroup.classList.toggle(INVISIBLE);
    observer.publish('showTasks', this.tasks);
  }

  showSearchResult(value) {
    const tasks = storage.getTasks();
    const sortedTasks = tasks.filter(task => task.title.includes(value) || task.createDate.includes(value));
    
    observer.publish('showTasks', sortedTasks);
  }

  sortByText() {
    this.sortModeContent = SORT_TEXT;
    const sortedTasks = this.getSortedArray(SORT_BY_TITLE);

    observer.publish('showTasks', sortedTasks);
  }

  sortByDate() {
    this.sortModeContent = SORT_DATE;
    const sortedTasks = this.getSortedArray(SORT_BY_DATE);

    observer.publish('showTasks', sortedTasks);
  }

  getSortedArray(area) {
    const tasks = storage.getTasks();
    const warningMessage = document.querySelector('.warning-message');


    if(!tasks.length) {
      warningMessage.classList.add('warning-message--show');
    }

    return this.sortMode === SORT_UP
      ? tasks.sort((a, b) => a[area] > b[area] ? 1 : -1)
      : tasks.sort((a, b) => a[area] < b[area] ? 1 : -1);
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

