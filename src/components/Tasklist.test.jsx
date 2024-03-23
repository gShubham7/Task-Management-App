import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Tasklist from "./Tasklist";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../redux/reducers";

const createTestStore = (initialState) =>
  createStore(rootReducer, initialState);

describe("TaskList component", () => {
  it("renders TaskList with task items", () => {
    const initialState = {
      tasks: [
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          dueDate: "2024-04-01",
          status: "pending",
        },
        {
          id: "2",
          title: "Task 2",
          description: "Description 2",
          dueDate: "2024-04-02",
          status: "completed",
        },
      ],
    };

    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Tasklist />
      </Provider>
    );

    const taskTitle1 = screen.getByText("Task 1");
    const taskTitle2 = screen.getByText("Task 2");
    expect(taskTitle1).toBeInTheDocument();
    expect(taskTitle2).toBeInTheDocument();
  });

  it("deletes a task", () => {
    const initialState = {
      tasks: [
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          dueDate: "2024-04-01",
          status: "pending",
        },
      ],
    };

    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Tasklist />
      </Provider>
    );

    const deleteButton = screen.getByTestId("delete-button-1");

    fireEvent.click(deleteButton);

    const taskTitle1 = screen.queryByText("Task 1");
    expect(taskTitle1).toBeNull();
  });

  it("toggles task status", () => {
    const initialState = {
      tasks: [
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          dueDate: "2024-04-01",
          status: "pending",
        },
      ],
    };

    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Tasklist />
      </Provider>
    );

    const toggleButton = screen.getByTestId("toggle-button-1");

    fireEvent.click(toggleButton);

    const taskStatus = store.getState().tasks[0].status;
    expect(taskStatus).toBe("completed");
  });

  it("opens edit modal for a task", () => {
    const initialState = {
      tasks: [
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          dueDate: "2024-04-01",
          status: "pending",
        },
      ],
    };

    const store = createTestStore(initialState);

    render(
      <Provider store={store}>
        <Tasklist />
      </Provider>
    );

    const editButton = screen.getByTestId("edit-button-1");

    fireEvent.click(editButton);

    const modalTitle = screen.getByText("Edit Task");
    expect(modalTitle).toBeInTheDocument();
  });
});
