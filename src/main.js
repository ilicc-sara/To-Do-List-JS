"use strict";
import "./style.css";

const input = document.querySelector(".input-name");

input.addEventListener("input", function (e) {
  console.log(input.value);
});

const toDoCreator = function () {
  let name = "";
  let id = crypto.randomUUID();
  let isDone = false;

  const getName = () => name;

  const setName = (value) => (name = value);

  return { getName, setName };
};

const toDo = toDoCreator();

const toDoManagerCreator = function () {
  let toDos = [];

  const addToDos = (toDo) => toDos.push(toDo);
  const getToDos = () => toDos;

  return { addToDos, getToDos };
};
