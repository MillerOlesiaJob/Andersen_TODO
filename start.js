import TaskList from './TasksList.js';
import ModalWindow from './ModalWindow.js';

// const tasks = [{
//   id: 1,
//   title: 'title',
//   description: 'description',
//   isDone: false,
//   createDate: '14.08.2020',
//   deadline: '14.08.2020',
// }];

const taskList = new TaskList();
const modalWindow = new ModalWindow();

window.addEventListener('load', () => {
  taskList.showTasks();
  taskList.setupListeners();
  modalWindow.setupListeners();
})
