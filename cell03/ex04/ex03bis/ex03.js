// Cookie helpers
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return "";
}

// DOM & logic
const ft_list = document.getElementById('ft_list');
const newBtn = document.getElementById('new-btn');

function saveTodos() {
  const todos = [];
  ft_list.querySelectorAll('.todo').forEach(div => todos.push(div.textContent));
  setCookie('todo_list', JSON.stringify(todos), 365);
}

function loadTodos() {
  const data = getCookie('todo_list');
  if (data) {
    try {
      const todos = JSON.parse(data);
      todos.forEach(text => addTodo(text, false));
    } catch {}
  }
}

function addTodo(text, save = true) {
  if (!text) return;
  const div = document.createElement('div');
  div.className = 'todo';
  div.textContent = text;
  div.onclick = function() {
    if (confirm('Do you want to remove this TO DO?')) {
      div.remove();
      saveTodos();
    }
  };
  ft_list.appendChild(div);
  if (save) saveTodos();
}

newBtn.onclick = function() {
  const text = prompt('Enter your new TO DO:');
  if (text && text.trim() !== '') {
    addTodo(text.trim());
  }
};

// On load
loadTodos();