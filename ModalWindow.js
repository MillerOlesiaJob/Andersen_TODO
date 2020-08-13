import App from './App.js';
import {
  OVERFLOW_HIDDEN,
  INVISIBLE,
  REQUIRED_FIELD_MESSAGE,
  VALIDATION_MESSAGE,
  DEADLINE_WARNING
} from './constants.js';

class ModalWindow extends App {
  constructor() {
    super();

    this.cancelBtn = document.getElementById('modalCancel');
    this.saveBtn = document.getElementById('modalSave');

    this.modalWindow = document.getElementById('modalWindow');
    this.wrapModal = document.querySelector('.wrap-modal');

    this.showModalBtn = document.getElementById('showModal');
    this.titleField = document.querySelector('.modal__title-input');
    this.descriptionField = document.querySelector('.modal__description-input');
    this.creationDateField = document.querySelector('.modal__create-input');
    this.expirationDateField = document.querySelector('.modal__deadline-input');
    this.warningTitleField = document.getElementById('warningMessageModal');
    this.warningExpirationField = document.getElementById('warningMessageDeadline');
  }

  setupListeners() {
    this.showModalBtn.addEventListener('click', () => this.showModal());
    this.cancelBtn.addEventListener('click', () => this.closeModal());
    this.saveBtn.addEventListener('click', () => this.saveTask());
    this.titleField.addEventListener('change', () => this.cleanInputField(this.titleField, this.warningTitleField));
    this.expirationDateField.addEventListener('change', () => this.cleanInputField(this.expirationDateField, this.warningExpirationField));
  }

  showModal() {
    //if user started enter text into input it would be displayed on modal form
    if (this.inputField.value) {
      this.titleField.value = this.inputField.value
    }

    if (!this.isValid) {
      this.cleanInput(this.inputField, this.warningTitleField);
    }

    this.toggleModal();
    this.titleField.focus();
    this.creationDateField.value = this.getDateFormat(this.getDate(Date.now()));
    this.expirationDateField.value = this.getDateFormat(this.getDate(Date.now(), true));
  }

  toggleModal() {
    document.body.classList.toggle(OVERFLOW_HIDDEN);
    this.wrapModal.classList.toggle(INVISIBLE);
    this.modalWindow.classList.toggle(INVISIBLE);
    this.isModalOpen = !this.isModalOpen;
  }

  getDateFormat(date) {
    return date.split('.').reverse().join('-');
  }

  closeModal() {
    this.toggleModal();

    this.titleField.value = '';
    this.descriptionField.value = '';
    this.inputField.value = '';

    if (!this.isValid) {
      this.cleanInput(this.inputField, this.warningTitleField);
    }
  }

  saveTask() {
    const title = this.titleField.value;
    const description = this.descriptionField.value;
    const taskStart = this.getDate(this.creationDateField.value);
    const taskEnd = this.getDate(this.expirationDateField.value);

    if (!title) {
      this.showWarning(this.titleField, this.warningTitleField, REQUIRED_FIELD_MESSAGE);
      return;
    }

    if (taskStart > taskEnd) {
      this.showWarning(this.expirationDateField, this.warningExpirationField, DEADLINE_WARNING);
      return;
    }

    if (this.isValidText(title)) {
      this.showWarning(this.titleField, this.warningTitleField, VALIDATION_MESSAGE);
      return;
    }

    const task = {
      title: title,
      description: description,
      taskStart: taskStart,
      taskEnd: taskEnd,
    }

    this.setTask(task);
    this.closeModal();
  }
}

export default ModalWindow;