import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditTaskModal from "./EditTaskModal";

describe("EditTaskModal Component", () => {
  const mockHandleUpdateTask = jest.fn();
  const mockHandleEditTask = jest.fn();
  const mockHandleCloseEditModal = jest.fn();
  const mockError = "All fields are required";

  const mockTask = {
    title: "Mock Task",
    description: "Mock Task Description",
    dueDate: "2024-04-01",
  };

  beforeEach(() => {
    render(
      <EditTaskModal
        updateTask={mockTask}
        error={mockError}
        handleUpdateTask={mockHandleUpdateTask}
        handleEditTask={mockHandleEditTask}
        handleCloseEditModal={mockHandleCloseEditModal}
      />
    );
  });

  it("renders input fields with correct values", () => {
    expect(screen.getByPlaceholderText("Title")).toHaveValue(mockTask.title);
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      mockTask.description
    );
    expect(screen.getByDisplayValue(mockTask.dueDate)).toBeInTheDocument();
  });

  it("calls handleUpdateTask on input change", () => {
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Title" },
    });
    expect(mockHandleUpdateTask).toHaveBeenCalledTimes(1);
  });

  it("calls handleEditTask on Save button click", () => {
    fireEvent.click(screen.getByText("Save"));
    expect(mockHandleEditTask).toHaveBeenCalledTimes(1);
  });

  it("calls handleCloseEditModal on Cancel button click", () => {
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleCloseEditModal).toHaveBeenCalledTimes(1);
  });
});
