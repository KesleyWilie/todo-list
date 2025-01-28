// Seletores
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

// Adicionar tarefa
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const taskValue = taskInput.value.trim();
  
  if (taskValue === "") {
    errorMessage.textContent = "O campo não pode ser vazio!";
    errorMessage.style.display = "block";
    return;
  }
  
  errorMessage.style.display = "none";
  
  const listItem = document.createElement("li");
  listItem.textContent = taskValue;

  // Botão Excluir
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Excluir";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", () => taskList.removeChild(listItem));
  
  // Marcar como concluída
  listItem.addEventListener("click", () => {
    listItem.classList.toggle("completed");
  });
  
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);
  taskInput.value = "";
});

// Carregar tarefas iniciais da API
const loadInitialTasks = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const tasks = await response.json();
    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.textContent = task.title;

      // Botão Excluir
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => taskList.removeChild(listItem));
      
      // Marcar como concluída
      listItem.addEventListener("click", () => {
        listItem.classList.toggle("completed");
      });

      if (task.completed) {
        listItem.classList.add("completed");
      }
      
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erro ao carregar tarefas da API:", error);
  }
};

loadInitialTasks();