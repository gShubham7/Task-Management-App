import { ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_STATUS } from "./types";

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId ? action.payload.updatedTask : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case TOGGLE_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                status: task.status === "pending" ? "completed" : "pending",
              }
            : task
        ),
      };
    default:
      return state;
  }
};

export default taskReducer;
