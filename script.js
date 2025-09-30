document.addEventListener('DOMContentLoaded', () =>
  {
    const taskInput = document.getElementById
      ('task-input');
    const addTaskBtn = document.getElementById
      ('add-task-btn');
    const taskList = document.getElementById
      ('task-list');
    const bunny = document.querySelector('.empty-image');
    const todosContainer = document.querySelector
      ('.todos-container');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');
  
    const toggleEmptyState = () => {
      bunny.style.display = taskList.children.length === 0 ? 'block' : 'none';
      todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };
    
    const updateProgress = (checkCompletion = true) => {
      const totalTasks = taskList.children.length;
      const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

      progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` :
        '0%';
      progressNumbers.textContent = `${completedTasks} / ${totalTasks}`

      if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
        Confetti();
      }
    };

    const addTask = (event) => {
  
      if (event && event.preventDefault) { 
          event.preventDefault();
      }
      const taskText = taskInput.value.trim(); 

      if (!taskText) {
        return;
      }
    
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" class="checkbox" />
        <span>${taskText}</span>
        <div class="task-buttons">
          <button class="edit-btn"><i
          class="fa-solid fa-pen"></i></button> 
          <button class="delete-btn"><i
          class="fa-solid fa-trash"></i></button>
          </div>
      `;
    
      const checkbox = li.querySelector('.checkbox');
      const editBtn = li.querySelector('.edit-btn'); 
  
      checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
        li.classList.toggle('completed', isChecked);
        editBtn.disabled = isChecked;
        editBtn.style.opacity = isChecked ? '0.5' : '1';
        editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
        updateProgress();
      });
  
  
      editBtn.addEventListener('click', () => {
        if (!checkbox.checked) {
          taskInput.value = li.querySelector('span').textContent;
          li.remove();
          toggleEmptyState();
          updateProgress(false);
        }
      });
  
  
      li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        toggleEmptyState();
        updateProgress();
      })
  
      taskList.appendChild(li);
      taskInput.value = '';
      toggleEmptyState();
      updateProgress(); 
    };
    
    addTaskBtn.addEventListener('click', addTask); 
    
    taskInput.addEventListener('keypress', (e) => 
    {
      if (e.key === 'Enter')
      {
        addTask(e); 
      }
    })
    
    updateProgress(); 
});
  
const Confetti = () => {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };
  
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });
  
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }
  
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);

};