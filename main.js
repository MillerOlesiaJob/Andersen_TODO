const VALIDATION_MESSAGE = 'Please, use only string and number symbols';
const REQUiRED_FIELD_MESSAGE = 'Please fill required field';
const WARNING = 'task-list__input--warning';
const INVISIBLE = 'display--none';
const OVERFLOW_HIDDEN = 'overflow--hidden';

class TasksList {
  constructor() {
    this.list = document.getElementById('taskList');
    this.input = document.getElementById('newTask');
    this.modalBtn = document.getElementById('showModal');
    this.modalWindow = document.getElementById('modalWindow');
    this.wrapModal = document.querySelector('.wrap-modal');
    this.warningMessage = document.getElementById('warningMessage');
    this.cancelBtn = document.getElementById('modalCancel');
    this.saveBtn = document.getElementById('modalSave');

    this.modalTitleText = document.querySelector('.modal__title-input');
    this.modalDescriptionText = document.querySelector('.modal__description-input');
    this.modalCreationDate = document.querySelector('.modal__create-input');
    this.modalDeadline = document.querySelector('.modal__deadline-input');
    this.modalWarningMessage = document.getElementById('warningMessageModal');

    this.tasks = [];
    this.isValid = true;
    this.isModalOpen = false;
  }

  setupListeners() {
    this.input.addEventListener('keyup', (event) => {
      if(event.keyCode === 13) {
        this.addNewItem(event.target.value);
      }
    })

    this.modalBtn.addEventListener('click', () => this.showModal());
    this.cancelBtn.addEventListener('click', () => this.closeModal());
    this.saveBtn.addEventListener('click', () => this.saveTaskFromModal());
    this.modalTitleText.addEventListener('change', () => this.cleanInput(this.modalTitleText, this.modalWarningMessage));
  }

  setTask(task) {
    this.tasks.push(task);
    this.showTasks();
  }

  showTasks() {
    this.list.innerHTML = '';
    this.tasks.forEach(task => {
      const item = document.createElement('li');
      const checkbox = document.createElement('input');
      const label = document.createElement('label');
      const content = document.createElement('div');
      const title = document.createElement('p');
      const createDate = document.createElement('span');
      const deadline = document.createElement('span');


      item.classList.add('task-list__item', 'item');
      checkbox.classList.add('item__checkbox');
      content.classList.add('item__content');
      title.classList.add('item__title');

      checkbox.type = 'checkbox';
      checkbox.id = task.id;
      label.setAttribute('for', task.id);

      title.innerHTML = task.title;
      createDate.innerHTML = `${task.createDate} -`;
      deadline.innerHTML = task.deadline;

      content.append(title);

      if(task.description) {
        const description = document.createElement('p');
        description.classList.add('item__description');
        description.innerHTML = task.description;
        content.appendChild(description);
      }
      content.append(createDate, deadline);
      item.append(checkbox, label, content);
      this.list.appendChild(item);
    })
  }

  addNewItem(text) {
    if (!text) {
      return;
    }

    if (this.checkValidText(text)) {
      this.showWarning(this.input, this.warningMessage, VALIDATION_MESSAGE);
      this.isValid = false;
      return;
    }

    const newTask = {
      id: this.generateId(),
      title: text,
      isDone: false,
      createDate: this.getDate(Date.now()),
      deadline: this.getDate(Date.now(), true),
      description: '',
    }

    this.setTask(newTask);
    this.cleanInput(this.input, this.warningMessage);
    this.input.value = '';
  }

  saveTaskFromModal() {
    const title = this.modalTitleText.value;
    if (!title) {
      this.showWarning(this.modalTitleText, this.modalWarningMessage, REQUiRED_FIELD_MESSAGE);
      return;
    }
    if (this.checkValidText(title)) {
      this.showWarning(this.modalTitleText, this.modalWarningMessage, VALIDATION_MESSAGE);
      return;
    }

    const newTask = {
      title: title,
      description: this.modalDescriptionText.value,
      createDate: this.getDate(this.modalCreationDate.value),
      deadline: this.getDate(this.modalDeadline.value),
    }

    this.setTask(newTask);
    this.closeModal();
  }

  cleanInput(input, text) {
    this.isValid = true;
    input.classList.remove(WARNING);
    text.classList.add(INVISIBLE);
  }

  generateId() {
    return Date.now();
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

  checkValidText(text) {
    return text.match(/[^\w\s]/);
  }

  showWarning(input, text, message) {
    this.isValid = false;
    input.classList.add(WARNING);
    text.classList.remove(INVISIBLE);
    text.innerHTML = message;
  }

  showModal() {
    //if user started enter text into input it would be displayed on modal form
    if (this.input.value) {
      this.modalTitleText.value = this.input.value
    }

    if (!this.isValid) {
      this.cleanInput(this.input, this.warningMessage);
    }

    this.toggleModal();
    this.modalTitleText.focus()
    this.modalCreationDate.value = this.getDate(Date.now()).split('.').reverse().join('-');
    this.modalDeadline.value = this.getDate(Date.now(), true).split('.').reverse().join('-');
  }

  toggleModal() {
    document.body.classList.toggle(OVERFLOW_HIDDEN);
    this.wrapModal.classList.toggle(INVISIBLE);
    this.modalWindow.classList.toggle(INVISIBLE);
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.toggleModal();

    this.modalTitleText.value = '';
    this.modalDescriptionText.value = '';
    this.input.value = '';

    if (!this.isValid) {
      this.cleanInput(this.modalTitleText, this.modalWarningMessage);
    }
  }
}

const taskList = new TasksList();
window.addEventListener('load', () => {
  taskList.showTasks();
  taskList.setupListeners();
})