import { INVISIBLE, WARNING } from './constants.js';
import { observer } from './Observer.js';
import { storage } from './Storage.js';
import { generateId } from './helpers/generateId.js';

class App {
  constructor() {
    this.isValid = true;
    this.isModalOpen = false;

    this.inputField = document.getElementById('newTask');
  }

  setTask(data) {
    storage.setTask(this.taskFormat(data));
    observer.publish('showTasks', storage.getTasks());
  }

  taskFormat(data) {
    const task = {
      id: generateId(),
      isDone: false,
      title: data.title,
      description: data.description,
      createDate: data.taskStart,
      deadline: data.taskEnd,
    }

    return task;
  }

  cleanInputField(inputField, text) {
    this.isValid = true;
    inputField.classList.remove(WARNING);
    text.classList.add(INVISIBLE);
  }

  getDate(inputDate, isDeadline = false) {
    const date = new Date(inputDate);
    let dd = isDeadline ? date.getDate() + 1 : date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();
  
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (yy < 10) yy = '0' + yy;
    return `${dd}.${mm}.${yy}`;
  }

  showWarning(inputField, text, message) {
    this.isValid = false;
    inputField.classList.add(WARNING);
    text.classList.remove(INVISIBLE);
    text.innerHTML = message;
  }

  isValidText(text) {
    return text.match(/[^\w\s]/);
  }
}

export default App;