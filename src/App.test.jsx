import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

describe("App component", () => {
  it("renders App with Navbar and Tasklist by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const navbarElement = screen.getByText("Task Manager");
    const tasklistElement = screen.getAllByText("Task List")[0];

    expect(navbarElement).toBeInTheDocument();
    expect(tasklistElement).toBeInTheDocument();
  });

  it('renders Taskform when "/add-task" route is active', () => {
    render(
      <MemoryRouter initialEntries={["/add-task"]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const taskformElement = screen.getAllByText("Add Task")[0];

    expect(taskformElement).toBeInTheDocument();
  });
});
