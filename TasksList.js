import { VALIDATION_MESSAGE, ENTER_KEY } from './constants.js';
import App from './App.js';
import { observer } from './Observer.js';
let item, checkbox, label, content, title, createDate, deadline;

class TasksList extends App {
  constructor() {
    super();
    this.list = document.getElementById('taskList');
    this.warningMessage = document.getElementById('warningMessage');

    observer.subscribe('showTasks', tasks => this.showTasks(tasks));
  }

  setupListeners() {
    this.inputField.addEventListener('keyup', (event) => {
      if(event.keyCode === ENTER_KEY) {
        this.addNewItem(event.target.value);
      }
    });

    this.inputField.addEventListener('change', () => this.cleanInputField(this.inputField, this.warningMessage));
  }

  addNewItem(title) {
    if (!title) {
      return;
    }

    if (this.isValidText(title)) {
      this.showWarning(this.inputField, this.warningMessage, VALIDATION_MESSAGE);
      this.isValid = false;
      return;
    }

    const taskStart = this.getDate(Date.now());
    const taskEnd = this.getDate(Date.now(), true);

    const task = {
      title: title,
      taskStart: taskStart,
      taskEnd: taskEnd,
    }

    this.setTask(task);
    this.cleanInputField(this.inputField, this.warningMessage);
    this.inputField.value = '';
  }

  showTasks(tasks) {
    if (!tasks) {
      return;
    }

    this.list.innerHTML = '';

    tasks.forEach(task => {
      this.creatNodes();
      this.setClassNames();
      this.setAttributes(task);
      this.setValues(task);

      content.appendChild(title);

      if(task.description) {
        this.addDescription(task);
      }

      content.append(createDate, deadline);
      item.append(checkbox, label, content);
      this.list.appendChild(item);
    })
  }
  
  creatNodes() {
    item = document.createElement('li');
    checkbox = document.createElement('input');
    label = document.createElement('label');
    content = document.createElement('div');
    title = document.createElement('p');
    createDate = document.createElement('span');
    deadline = document.createElement('span');
  }

  setClassNames() {
    item.classList.add('task-list__item', 'item');
    checkbox.classList.add('item__checkbox');
    content.classList.add('item__content');
    title.classList.add('item__title');
  }

  setAttributes(task) {
    checkbox.type = 'checkbox';
    checkbox.id = task.id;
    label.setAttribute('for', task.id);
  }

  setValues(task) {
    title.innerHTML = task.title;
    createDate.innerHTML = `${task.createDate} -`;
    deadline.innerHTML = task.deadline;
  }

  addDescription(task) {
    const description = document.createElement('p');
    description.classList.add('item__description');
    description.innerHTML = task.description;
    content.appendChild(description);
  }
}


export default TasksList;