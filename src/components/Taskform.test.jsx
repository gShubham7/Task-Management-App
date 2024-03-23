import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Taskform from "./Taskform";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("Taskform component", () => {
  it("renders Taskform with input fields and add button", () => {
    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );
    const titleInput = screen.getByPlaceholderText("Enter title");
    const descriptionInput = screen.getByPlaceholderText("Enter description");
    const dueDateInput = screen.getByPlaceholderText("Due Date");
    const addButton = screen.getByText("Add Task");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("displays form validation error when adding task without filling fields", () => {
    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );
    const addButton = screen.getByText("Add Task");

    fireEvent.click(addButton);

    const errorMessages = screen.getByText("All fields are required");
    expect(errorMessages).toBeInTheDocument();
  });

  it("submits the form with correct data", () => {
    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );
    const titleInput = screen.getByPlaceholderText("Enter title");
    const descriptionInput = screen.getByPlaceholderText("Enter description");
    const dueDateInput = screen.getByPlaceholderText("Due Date");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(titleInput, { target: { value: "Task Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Task Description" },
    });
    fireEvent.change(dueDateInput, { target: { value: "2024-04-30" } });
    fireEvent.click(addButton);

    const submittedTask = store.getState().tasks[0];
    expect(submittedTask.title).toBe("Task Title");
    expect(submittedTask.description).toBe("Task Description");
    expect(submittedTask.dueDate).toBe("2024-04-30");
    expect(submittedTask.status).toBe("pending");
  });
});
