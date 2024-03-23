import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("renders Navbar with links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const taskManagerLink = screen.getByText("Task Manager");
    const taskListLink = screen.getByText("Task List");
    const addTaskLink = screen.getByText("Add Task");

    expect(taskManagerLink).toBeInTheDocument();
    expect(taskListLink).toBeInTheDocument();
    expect(addTaskLink).toBeInTheDocument();
  });

  it("has correct link destinations", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const taskListLink = screen.getByText("Task List");
    const addTaskLink = screen.getByText("Add Task");

    expect(taskListLink).toHaveAttribute("href", "/");
    expect(addTaskLink).toHaveAttribute("href", "/add-task");
  });
});
