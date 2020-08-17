import App from './App.js';
import {
  OVERFLOW_HIDDEN,
  INVISIBLE,
  REQUIRED_FIELD_MESSAGE,
  VALIDATION_MESSAGE,
  DEADLINE_WARNING,
  EMPTY_TASK_MESSAGE
} from './constants.js';
import { observer } from './Observer.js';

class ModalWindow extends App {
  constructor() {
    super();
    this.taskForEdit = {};

    this.titleField = document.querySelector('.modal__title-input');
    this.descriptionField = document.querySelector('.modal__description-input');
    this.creationDateField = document.querySelector('.modal__create-input');
    this.expirationDateField = document.querySelector('.modal__deadline-input');
    this.warningTitleField = document.getElementById('warningMessageModal');
    this.warningExpirationField = document.getElementById('warningMessageDeadline');

    observer.subscribe('editTask', task => this.showModalToEdit(this.taskForEdit = task));
  }

  setupListeners() {
    const cancelBtn = document.getElementById('modalCancel');
    const saveBtn = document.getElementById('modalSave');
    const showModalBtn = document.getElementById('showModal');

    showModalBtn.addEventListener('click', () => this.showModalToAdd());
    cancelBtn.addEventListener('click', () => this.closeModal());
    saveBtn.addEventListener('click', () => this.saveTask());
    this.titleField.addEventListener('change', () => this.cleanInputField(this.titleField, this.warningTitleField));
    this.expirationDateField.addEventListener('change', () => this.cleanInputField(this.expirationDateField, this.warningExpirationField));
  }

  showModalToAdd() {
    //if user started enter text into input it would be displayed on modal form
    if (this.inputField.value) {
      this.titleField.value = this.inputField.value
    }

    if (!this.isValid) {
      this.cleanInputField(this.inputField, this.warningTitleField);
    }

    this.toggleModal();
    this.titleField.focus();
    this.creationDateField.value = this.getDateFormat(this.getDate(Date.now()));
    this.expirationDateField.value = this.getDateFormat(this.getDate(Date.now(), true));
  }

  showModalToEdit(task) {
    this.toggleModal();
    this.setDataForEdit(task);
  }

  setDataForEdit(task) {
    this.titleField.value = task.title;
    this.descriptionField.value = task.description;
    this.creationDateField.value = this.getDateFormat(task.createDate);
    this.expirationDateField.value = this.getDateFormat(task.deadline);
  }

  closeModal() {
    this.toggleModal();
    this.clearFields();

    if (!this.isValid) {
      this.cleanInput(this.inputField, this.warningTitleField);
    }
  }

  toggleModal() {
    const modalWindow = document.getElementById('modalWindow');
    const wrapModal = document.querySelector('.wrap-modal');

    document.body.classList.toggle(OVERFLOW_HIDDEN);
    wrapModal.classList.toggle(INVISIBLE);
    modalWindow.classList.toggle(INVISIBLE);
    this.isModalOpen = !this.isModalOpen;
  }

  clearFields() {
    this.titleField.value = '';
    this.descriptionField.value = '';
    this.inputField.value = '';

    this.cleanInputField(this.titleField, this.warningTitleField);
    this.cleanInputField(this.expirationDateField, this.warningExpirationField);
  }

  getDateFormat(date) {
    return date.split('.').reverse().join('-');
  }

  saveTask() {
    const title = this.titleField.value;
    const description = this.descriptionField.value;
    const taskStart = this.getDate(this.creationDateField.value);
    const taskEnd = this.getDate(this.expirationDateField.value);
    const id = this.taskForEdit.id;

    if (!title) {
      this.showWarning(this.titleField, this.warningTitleField, REQUIRED_FIELD_MESSAGE);
      return;
    }

    if (!title.trim()) {
      this.showWarning(this.titleField, this.warningTitleField, EMPTY_TASK_MESSAGE);
      setTimeout(() => this.cleanInputField(this.titleField, this.warningTitleField), 2000);
      return;
    }

    if (taskStart > taskEnd) {
      this.showWarning(this.expirationDateField, this.warningExpirationField, DEADLINE_WARNING);
      return;
    }

    if (this.isInvalidText(title)) {
      this.showWarning(this.titleField, this.warningTitleField, VALIDATION_MESSAGE);
      return;
    }

    const task = {
      id,
      title: title,
      description: description,
      taskStart: taskStart,
      taskEnd: taskEnd,
    }
    
    id && observer.publish('deleteTask', id);

    this.setTask(task);
    this.closeModal();
    observer.publish('showTasks');
  }
}

export default ModalWindow;
