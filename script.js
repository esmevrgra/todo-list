
document.addEventListener('DOMContentLoaded', () =>
{
  const taskInput = document.getElementById
    ('task-input');
  const addTaskBtn = document.getElementById
    ('add-task-btn');
  const taskList = document.getElementById
    ('task-list');
    const bunny = document.querySelector('.empty-image');

  const toggleEmptyState = () => 
  {
    bunny.style.display = taskList.children.length === 0 ? 'block' : 'none';
  }
  
  
  const addTask = (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim(); 
    if (!taskText) {
      return;
    }
  
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="checkbox">
      <span>${taskText}</span>
    `;
  
    taskList.appendChild(li);
    taskInput.value = '';
    toggleEmptyState();
  };
  
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => 
  {
    if (e.key === 'Enter')
    {
      addTask(e);
    }
  })
});