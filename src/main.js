"use strict";
import "./style.css";

const input = document.querySelector(".input-name");
const form = document.querySelector(".form");
const listContainer = document.querySelector(".todo-list");

const toDoCreator = function () {
  let toDo = { id: crypto.randomUUID(), name: "", isDone: false };

  const getToDo = () => toDo;
  const getName = () => toDo.name;
  const editName = (value) => (toDo.name = value);
  const getId = () => toDo.id;
  const getIsDone = () => toDo.isDone;
  const changeStatus = (value) => (toDo.isDone = value);
  return { getToDo, getName, editName, getId, getIsDone, changeStatus };
};

const toDoManagerCreator = function () {
  let toDos = [];

  const addToDos = (toDo) => toDos.push(toDo);
  const getToDos = () => toDos;
  return { addToDos, getToDos };
};

const toDoManager = toDoManagerCreator();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const toDo = toDoCreator();
  toDo.editName(input.value);
  console.log(toDo.getToDo());
  toDoManager.addToDos(toDo);

  const toDoEl = document.createElement("li");
  toDoEl.innerHTML = `${input.value} <div class="btn-cont"><button class="btn-done">DONE</button><button class="btn-del">DELETE</button></div>`;
  toDoEl.setAttribute("data-id", toDo.getId());
  listContainer.appendChild(toDoEl).className = "to-do";
  input.value = "";
});

listContainer.addEventListener("click", function (e) {
  if (
    !e.target.classList.contains("btn-done") &&
    !e.target.classList.contains("btn-del")
  )
    return;

  if (e.target.classList.contains("btn-done")) {
    // prettier-ignore
    const targetEl = toDoManager.getToDos().find(item => item.getId() === e.target.closest(".to-do").getAttribute("data-id"));
    console.log(targetEl.changeStatus(true));

    toDoManager.getToDos().forEach((item) => console.log(item.getToDo()));
    e.target.style.backgroundColor = "gray";

    e.target.closest(".to-do").style.textDecoration = "line-through";
  } else {
    // prettier-ignore
    const index = toDoManager.getToDos().findIndex(item => item.getToDo().id === e.target.closest(".to-do").getAttribute("data-id"));
    toDoManager.getToDos().splice(index, 1);
    toDoManager.getToDos().forEach((item) => console.log(item.getToDo()));

    const deleteEL = e.target.closest(".to-do");
    deleteEL.remove();
  }
});
