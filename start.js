import TaskList from './TasksList.js';
import ModalWindow from './ModalWindow.js';
import { filterButtons } from './FilterButtons.js';

const taskList = new TaskList();
const modalWindow = new ModalWindow();

window.addEventListener('load', () => {
  taskList.showTasks();
  taskList.setupListeners();
  modalWindow.setupListeners();
  filterButtons.setupListeners();
});
