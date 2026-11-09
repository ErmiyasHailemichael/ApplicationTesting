import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Counter App", () => {
  // Step 4: starting state
  it("shows Count: 0 and all three buttons at the start", () => {
    render(<App />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Increment" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrement" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  // Step 5: statement coverage
  it("Increment changes the count from 0 to 1", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("Decrement changes the count from 0 to -1", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  it("Reset changes the count back to 0", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  // Step 6: a sequence of actions
  it("handles a sequence of actions", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByText("Count: 3")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Decrement" }));
    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Increment" }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
