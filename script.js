document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const bunny = document.querySelector('.empty-image');
  const todosContainer = document.querySelector('.todos-container');
  const progressBar = document.getElementById('progress');
  const progressNumbers = document.getElementById('numbers');

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
  
  const toggleEmptyState = () => {
      bunny.style.display = taskList.children.length === 0 ? 'block' : 'none';
      todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
  };
  
  const updateProgress = (checkCompletion = true) => {
      const totalTasks = taskList.children.length;
      const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

      progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` :
          '0%';
      progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

      if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
          Confetti(); 
      }
  };

  const saveTaskToLocalStorage = () => {
      const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
          text: li.querySelector('span').textContent,
          completed: li.querySelector('.checkbox').checked
      }));
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.forEach(({ text, completed }) => addTask(text, completed));
      toggleEmptyState();
      updateProgress();
  };

  const addTask = (sourceText, sourceCompleted = false) => {
      
      const taskText = typeof sourceText === 'string' ? sourceText : taskInput.value.trim(); 

      if (!taskText) {
          return;
      }
      
      const completed = typeof sourceText === 'string' ? sourceCompleted : false;
      
      const li = document.createElement('li');
      li.innerHTML = `
          <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
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
      
      if (completed) {
          li.classList.add('completed');
          editBtn.disabled = true;
          editBtn.style.opacity = '0.5';
          editBtn.style.pointerEvents = 'none';
      }
  
      checkbox.addEventListener('change', () => {
          const isChecked = checkbox.checked;
          li.classList.toggle('completed', isChecked);
          editBtn.disabled = isChecked;
          editBtn.style.opacity = isChecked ? '0.5' : '1';
          editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
          updateProgress();
          saveTaskToLocalStorage();
      });
  
      editBtn.addEventListener('click', () => {
          if (!checkbox.checked) {
              taskInput.value = li.querySelector('span').textContent;
              li.remove();
              toggleEmptyState();
              updateProgress(false);
              saveTaskToLocalStorage();
          }
      });
  
      li.querySelector('.delete-btn').addEventListener('click', () => {
          li.remove();
          toggleEmptyState();
          updateProgress();
          saveTaskToLocalStorage();
      })
  
      taskList.appendChild(li);
      
      if (typeof sourceText !== 'string') {
          taskInput.value = '';
          toggleEmptyState();
          updateProgress(); 
          saveTaskToLocalStorage();
      }
  };
  
  addTaskBtn.addEventListener('click', (e) => {
      e.preventDefault(); 
      addTask();
  }); 
  
  taskInput.addEventListener('keypress', (e) => 
  {
      if (e.key === 'Enter')
      {
          e.preventDefault(); 
          addTask(); 
      }
  });
  
  loadTasksFromLocalStorage(); 
});