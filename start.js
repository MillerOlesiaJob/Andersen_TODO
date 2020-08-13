import TaskList from './TasksList.js';
import ModalWindow from './ModalWindow.js';

const taskList = new TaskList();
const modalWindow = new ModalWindow();

window.addEventListener('load', () => {
  taskList.showTasks();
  taskList.setupListeners();
  modalWindow.setupListeners();
})