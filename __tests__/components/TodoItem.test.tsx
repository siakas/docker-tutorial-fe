import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TodoItem } from "@/components/TodoItem";
import { Todo } from "@/types/todo";

describe("TodoItem", () => {
  const mockTodo: Todo = {
    id: "1",
    text: "テストTodo",
    isCompleted: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  };

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  it("renders todo text", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("テストTodo")).toBeInTheDocument();
  });

  it("calls onToggle when todo is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const todoButton = screen.getByRole("button", {
      name: /未完了: テストTodo/,
    });
    fireEvent.click(todoButton);

    expect(mockOnToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /テストTodoを削除/,
    });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("shows completed todo with strikethrough", () => {
    const completedTodo: Todo = {
      ...mockTodo,
      isCompleted: true,
    };

    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const todoButton = screen.getByRole("button", {
      name: /完了済み: テストTodo/,
    });
    expect(todoButton).toHaveClass("line-through");
  });
});
