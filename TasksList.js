import { VALIDATION_MESSAGE, ENTER_KEY } from './constants.js';
import App from './App.js';
import { observer } from './Observer.js';
import { storage } from './Storage.js';
let item, checkbox, label, content, title, createDate, deadline, iconsContainer, deleteIcon, editIcon;

class TasksList extends App {
  constructor() {
    super();
    this.list = document.getElementById('taskList');
    this.warningMessage = document.getElementById('warningMessage');

    observer.subscribe('showTasks', tasks => this.showTasks(tasks));
    observer.subscribe('deleteTask', id => this.deleteTask(id));
  }

  setupListeners() {
    this.inputField.addEventListener('change', () => this.cleanInputField(this.inputField, this.warningMessage));
    this.inputField.addEventListener('keyup', event => {
      if (event.keyCode === ENTER_KEY) {
        this.addNewItem(event.target.value)
      }
    });

    this.list.addEventListener('click', ({target}) => {
      const id = target.parentElement.parentElement.firstChild.id;
      if (target.closest('input')) {
        this.markTask(target);

        return;
      }
      
      if (target.closest('.item__delete')) {
        this.deleteTask(id);

        return;
      }

      if (target.closest('.item__edit')) {
        this.editTask(id);

        return;
      }
    })
  }

  addNewItem(title) {
    if (!title) {
      return;
    }

    if (this.isInvalidText(title)) {
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
  
  markTask({id, checked}) {
    const tasks = storage.getTasks();
    const newTasks = tasks.map(task => task.id === Number(id) ? {...task, isDone: checked} : task);
    
    storage.setTasks(newTasks);
    observer.publish('showTasks', storage.getTasks());
  }

  deleteTask(id) {
    const tasks = storage.getTasks();
    const newTasks = tasks.filter(task => task.id !== Number(id));
    
    storage.setTasks(newTasks);
    observer.publish('showTasks', storage.getTasks());
  }

  editTask(id) {
    const task = storage.getTasks().find(task => task.id === Number(id));
    
    observer.publish('editTask', task);
  }

  showTasks(tasks) {
    if (!tasks) {
      return;
    }

    this.list.innerHTML = '';

    tasks.forEach(task => {
      this.creatNodes();
      this.setClassNames(task);
      this.setAttributes(task);
      this.setValues(task);

      content.appendChild(title);

      if(task.description) {
        this.addDescription(task);
      }

      content.append(createDate, deadline);
      iconsContainer.append(editIcon, deleteIcon);
      item.append(checkbox, label, content, iconsContainer);
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
    iconsContainer = document.createElement('div')
    deleteIcon = document.createElement('i');
    editIcon = document.createElement('i');
  }

  setClassNames(task) {
    item.classList.add('task-list__item', 'item');
    checkbox.classList.add('item__checkbox');
    content.classList.add('item__content');
    title.classList.add('item__title');
    iconsContainer.classList.add('item__icons-container');
    deleteIcon.classList.add('item__delete', 'fas', 'fa-times');
    editIcon.classList.add('item__edit', 'fas', 'fa-pencil-alt');

    if (task.isDone) {
      item.classList.add('item--done');
      content.classList.add('item__content--done');
    }
  }

  setAttributes(task) {
    checkbox.type = 'checkbox';
    checkbox.id = task.id;
    checkbox.checked = task.isDone;

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
