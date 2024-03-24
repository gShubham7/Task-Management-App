import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Tasklist from "./Tasklist";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../redux/reducers";

const createTestStore = (initialState) =>
  createStore(rootReducer, initialState);

describe("TaskList component", () => {
  beforeEach(() => {
    const initialState = {
      tasks: [
        {
          id: 1,
          title: "Task 1",
          description: "Description 1",
          dueDate: "2024-04-01",
          status: "pending",
        },
        {
          id: 2,
          title: "Task 2",
          description: "Description 2",
          dueDate: "2024-04-03",
          status: "completed",
        },
        {
          id: 3,
          title: "Task 3",
          description: "Description 3",
          dueDate: "2024-04-02",
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
  });

  it("renders TaskList with task items", () => {
    const taskTitle1 = screen.getByText("Task 1");
    const taskTitle2 = screen.getByText("Task 2");
    expect(taskTitle1).toBeInTheDocument();
    expect(taskTitle2).toBeInTheDocument();
  });

  it("deletes a task", () => {
    const deleteButton = screen.getByTestId("delete-button-1");

    fireEvent.click(deleteButton);

    const taskTitle1 = screen.queryByText("Task 1");
    expect(taskTitle1).toBeNull();
  });

  it("toggles task status", () => {
    const toggleButton = screen.getByTestId("toggle-button-1");

    fireEvent.click(toggleButton);

    const taskStatus = screen.getByTestId("toggle-button-1");
    expect(taskStatus).toHaveTextContent("Mark Incomplete");
  });

  it("opens edit modal for a task", () => {
    const editButton = screen.getByTestId("edit-button-1");

    fireEvent.click(editButton);

    const modalTitle = screen.getByText("Edit Task");
    expect(modalTitle).toBeInTheDocument();
  });

  it("renders tasks filtered by status", () => {
    fireEvent.change(screen.getByTestId("filter-by-status"), {
      target: { value: "completed" },
    });

    const taskTitles = screen.getAllByText(/Task/);
    expect(taskTitles.length).toBe(2);
    expect(taskTitles[1]).toHaveTextContent("Task 2");
  });

  it("renders tasks sorted by due date ascending", () => {
    fireEvent.change(screen.getByTestId("sort-by-due-date"), {
      target: { value: "asc" },
    });

    const taskTitles = screen.getAllByText(/Task/);
    expect(taskTitles[1]).toHaveTextContent("Task 1");
    expect(taskTitles[2]).toHaveTextContent("Task 3");
    expect(taskTitles[3]).toHaveTextContent("Task 2");
  });
});
