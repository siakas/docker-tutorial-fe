import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { TodoForm } from "@/components/TodoForm";

describe("TodoForm", () => {
  const mockOnAddTodo = vi.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  it("renders input and button", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} />);

    expect(screen.getByPlaceholderText("新しいTodoを入力")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Todoを追加" })
    ).toBeInTheDocument();
  });

  it("calls onAddTodo when form is submitted", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("新しいTodoを入力");
    const button = screen.getByRole("button", { name: "Todoを追加" });

    fireEvent.change(input, { target: { value: "新しいTodo" } });
    fireEvent.click(button);

    expect(mockOnAddTodo).toHaveBeenCalledWith("新しいTodo");
  });

  it("calls onAddTodo when Enter key is pressed", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("新しいTodoを入力");

    fireEvent.change(input, { target: { value: "新しいTodo" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnAddTodo).toHaveBeenCalledWith("新しいTodo");
  });

  it("does not call onAddTodo when input is empty", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} />);

    const button = screen.getByRole("button", { name: "Todoを追加" });
    fireEvent.click(button);

    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  it("clears input after adding todo", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} />);

    const input = screen.getByPlaceholderText("新しいTodoを入力");
    const button = screen.getByRole("button", { name: "Todoを追加" });

    fireEvent.change(input, { target: { value: "新しいTodo" } });
    fireEvent.click(button);

    expect(input).toHaveValue("");
  });
});
