import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTodoStore } from "@/stores/TodoStore";
import { config } from "@/lib/config";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("TodoStore", () => {
  beforeEach(() => {
    // Reset store state
    useTodoStore.setState({
      todos: [],
      isLoading: false,
      error: null,
    });
    localStorageMock.clear();
  });

  it("should add a todo", () => {
    const { addTodo } = useTodoStore.getState();

    addTodo("新しいTodo");

    const { todos } = useTodoStore.getState();
    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe("新しいTodo");
    expect(todos[0].isCompleted).toBe(false);
    expect(todos[0].createdAt).toBeInstanceOf(Date);
    expect(todos[0].updatedAt).toBeInstanceOf(Date);
  });

  it("should not add empty todo", () => {
    const { addTodo } = useTodoStore.getState();

    expect(() => addTodo("")).toThrow("Todoのテキストを入力してください");

    const { todos } = useTodoStore.getState();
    expect(todos).toHaveLength(0);
  });

  it("should not add todo exceeding max length", () => {
    const { addTodo } = useTodoStore.getState();
    const longText = "a".repeat(config.todo.maxLength + 1);

    expect(() => addTodo(longText)).toThrow(
      `Todoは${config.todo.maxLength}文字以内で入力してください`
    );

    const { todos } = useTodoStore.getState();
    expect(todos).toHaveLength(0);
  });

  it("should toggle todo completion", () => {
    const { addTodo, toggleTodo } = useTodoStore.getState();

    addTodo("テストTodo");
    const { todos } = useTodoStore.getState();
    const todoId = todos[0].id;

    toggleTodo(todoId);

    const { todos: updatedTodos } = useTodoStore.getState();
    expect(updatedTodos[0].isCompleted).toBe(true);
  });

  it("should delete todo", () => {
    const { addTodo, deleteTodo } = useTodoStore.getState();

    addTodo("テストTodo");
    const { todos } = useTodoStore.getState();
    const todoId = todos[0].id;

    deleteTodo(todoId);

    const { todos: updatedTodos } = useTodoStore.getState();
    expect(updatedTodos).toHaveLength(0);
  });

  it("should clear error", () => {
    const { clearError } = useTodoStore.getState();

    // Set an error first
    useTodoStore.setState({ error: "テストエラー" });

    clearError();

    const { error } = useTodoStore.getState();
    expect(error).toBeNull();
  });
});
