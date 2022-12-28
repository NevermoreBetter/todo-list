const checkBtn = document.querySelectorAll(".check"),
  todoList = document.querySelector(".todo-list"),
  todoInput = document.querySelector("#todo-input"),
  completeBtn = document.querySelector(".select-clear"),
  selectAll = document.querySelector(".select-all"),
  selectActive = document.querySelector(".select-active"),
  selectCompleted = document.querySelector(".select-completed"),
  filterBtn = document.querySelectorAll(".filter>*"),
  desktopFilterBtn = document.querySelectorAll(".desktop-filter>*"),
  desktopSelectAll = document.querySelector(".desktop-select-all"),
  desktopSelectActive = document.querySelector(".desktop-select-active"),
  desktopSelectCompleed = document.querySelector(".desktop-select-completed"),
  submit = document.querySelector(".submit"),
  header = document.querySelector("header"),
  theme = document.querySelector(".style");

function createComponents(value) {
  const newTodo = document.createElement("li"),
    newCheck = document.createElement("button"),
    newDelete = document.createElement("button"),
    newText = document.createElement("p");

  newText.classList.add("item-content");
  newText.innerHTML = value;
  newTodo.classList.add("list-item");
  newCheck.classList.add("check");
  newDelete.classList.add("trash-button");
  todoList.appendChild(newTodo);
  newTodo.appendChild(newCheck);
  newTodo.appendChild(newText);
  newTodo.appendChild(newDelete);

  newCheck.addEventListener("click", (e) => {
    e.preventDefault();
    newTodo.classList.toggle("checked");
  });
}

function addTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return;

  createComponents(todoInput.value);
  todoInput.value = "";

  itemCount();
}

function deleteCheck(e) {
  const item = e.target,
    todo = item.parentElement;

  if (item.classList[0] === "trash-button") {
    todo.classList.add("fall");
    itemCount();
  }
}

function clearComplete() {
  const newCheckBtn = document.querySelectorAll(".list-item");
  newCheckBtn.forEach((element) => {
    if (element.classList.contains("checked")) {
      element.classList.add("fall");
    }
  });
  itemCount();
}

function filter(e) {
  const value = e.target.innerHTML,
    listItems = document.querySelectorAll(".list-item"),
    checkedItems = document.querySelectorAll(".checked"),
    activeItems = document.querySelectorAll(".todo-list>li:not(.checked)");
  switch (value) {
    case "All":
      listItems.forEach((item) => {
        item.style.display = "flex";
      });
      break;

    case "Active":
      let otherElemNotActive = checkedItems;

      activeItems.forEach((item) => {
        item.style.display = "flex";
      });

      otherElemNotActive.forEach((element) => {
        element.style.display = "none";
      });
      break;

    case "Completed":
      let otherElemNotCompleted = activeItems;

      checkedItems.forEach((item) => {
        item.style.display = "flex";
      });

      otherElemNotCompleted.forEach((element) => {
        element.style.display = "none";
      });

      break;
  }
  itemCount();
}

function itemCount() {
  const items = document.querySelector(".items"),
    listItem = document.querySelectorAll(".list-item"),
    listFall = document.querySelectorAll(".fall");

  let count = listItem.length - listFall.length;
  if (count <= 1) items.innerHTML = `${count} item left`;
  else items.innerHTML = `${count} items left`;
}

function changeTheme() {
  document.querySelector("body").classList.toggle("light");
  console.log(theme.classList);
  theme.classList.toggle("moon");
}

function changeImage() {
  if ((document.getElementById("styleBtn").src = "/images/icon-moon.svg")) {
    document.getElementById("styleBtn").src = "/images/icon-sun.svg";
  } else if (
    (document.getElementById("styleBtn").src = "/images/icon-sun.svg")
  ) {
    document.getElementById("styleBtn").src = "/images/icon-moon.svg";
  }
}

checkBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    button.parentNode.classList.toggle("checked");
  });
});

submit.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
completeBtn.addEventListener("click", clearComplete);
filterBtn.forEach((button) => {
  button.addEventListener("click", filter);
});

desktopFilterBtn.forEach((button) => {
  button.addEventListener("click", filter);
});
desktopSelectAll.addEventListener("click", () => {
  if (desktopSelectAll.classList.contains("active")) return;
  else {
    desktopSelectAll.classList.add("active");
    desktopSelectActive.classList.remove("active");
    desktopSelectCompleed.classList.remove("active");
  }
});
desktopSelectActive.addEventListener("click", () => {
  if (desktopSelectActive.classList.contains("active")) return;
  else {
    desktopSelectActive.classList.add("active");
    desktopSelectAll.classList.remove("active");
    desktopSelectCompleed.classList.remove("active");
  }
});
desktopSelectCompleed.addEventListener("click", () => {
  if (desktopSelectCompleed.classList.contains("active")) return;
  else {
    desktopSelectCompleed.classList.add("active");
    desktopSelectCompleed.classList.remove("active");
    desktopSelectCompleed.classList.remove("active");
  }
});

selectAll.addEventListener("click", () => {
  if (selectAll.classList.contains("active")) return;
  else {
    selectAll.classList.add("active");
    selectActive.classList.remove("active");
    selectCompleted.classList.remove("active");
  }
});
selectActive.addEventListener("click", () => {
  if (selectActive.classList.contains("active")) return;
  else {
    selectActive.classList.add("active");
    selectAll.classList.remove("active");
    selectCompleted.classList.remove("active");
  }
});
selectCompleted.addEventListener("click", () => {
  if (selectCompleted.classList.contains("active")) return;
  else {
    selectCompleted.classList.add("active");
    selectActive.classList.remove("active");
    selectAll.classList.remove("active");
  }
});

theme.addEventListener("click", changeTheme);

itemCount();
