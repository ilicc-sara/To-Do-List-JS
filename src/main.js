"use strict";
import "./style.css";

const input = document.querySelector(".input-name");
const form = document.querySelector(".form");

const container = document.querySelector(".container");

const listContainer = document.querySelector(".todo-list");

input.addEventListener("input", function (e) {
  // console.log(input.value);
});

const toDoCreator = function () {
  let toDo = { name: "", id: crypto.randomUUID() };
  let name = "";
  let id = crypto.randomUUID();
  let isDone = false;

  const gettoDo = () => toDo;
  const getName = () => name;
  const setName = (value) => (name = value);
  const getId = () => id;
  const getIsDone = () => isDone;
  const changeStatus = (value) => (isDone = value);
  return { gettoDo, getName, setName, getId, getIsDone, changeStatus };
};

const toDo = toDoCreator();

const toDoManagerCreator = function () {
  let toDos = [];

  const addToDos = (toDo) => toDos.push(toDo);
  const getToDos = () => toDos;
  return { addToDos, getToDos };
};

const toDoManager = toDoManagerCreator();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  toDoManager.addToDos(toDoCreator());

  toDoManager.getToDos().forEach((x) => console.log(x.gettoDo()));

  console.log(input.value);

  const toDoEl = document.createElement("li");
  toDoEl.textContent = input.value;
  listContainer.appendChild(toDoEl).className = "to-do";
  input.value = "";
});
