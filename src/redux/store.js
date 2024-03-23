import { legacy_createStore as createStore } from "redux";
import taskReducer from "./reducers";

const savedTasks = localStorage.getItem("tasks");
const initialState = {
  tasks: savedTasks ? JSON.parse(savedTasks) : [],
};

const store = createStore(taskReducer, initialState);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
});

export default store;
