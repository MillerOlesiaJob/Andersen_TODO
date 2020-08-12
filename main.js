const tasks = [
  {
    id: 1,
    title: 'Task1',
    isDone: false,
  },
  {
    id: 2,
    title: 'Task2',
    isDone: false,
  },
  {
    id: 3,
    title: 'Task3',
    isDone: false,
  },
]

class TasksList {
  constructor() {
    this.list = document.getElementById('taskList');
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  showTasks() {
    this.tasks.forEach(task => {
      const item = document.createElement('li');
      const checkbox = document.createElement('input');
      const label = document.createElement('label');
      const content = document.createElement('div');
      const title = document.createElement('p');


      item.classList.add('task-list__item', 'item');
      checkbox.classList.add('item__checkbox');
      checkbox.id = task.id;
      label.setAttribute('for', task.id);
      content.classList.add('item__content');
      title.classList.add('item__title');

      checkbox.type = 'checkbox';

      title.innerHTML = task.title;

      if(task.description) {
        const description = document.createElement('p');
        description.classList.add('item__description');
        description.innerHTML = task.description;
        content.appendChild(description);
      }

      content.appendChild(title);
      item.append(checkbox, label, content);
      this.list.appendChild(item);
    })
  }
}

const taskList = new TasksList();



window.addEventListener('load', () => {
  taskList.showTasks();
})