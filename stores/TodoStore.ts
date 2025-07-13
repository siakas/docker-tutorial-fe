import { config } from "@/lib/config";
import { ValidationError } from "@/lib/errors";
import { Todo } from "@/types/todo";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type TodoStore = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  setInitialTodos: (todos: Todo[]) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearError: () => void;
};

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set, get) => ({
        todos: [],
        isLoading: false,
        error: null,

        setInitialTodos: (todos) =>
          set({ todos }, undefined, "TodoStore/setInitialTodos"),

        addTodo: (text) => {
          try {
            // バリデーション
            if (!text.trim()) {
              throw new ValidationError(
                "Todoのテキストを入力してください",
                "text",
              );
            }

            if (text.length > config.todo.maxLength) {
              throw new ValidationError(
                `Todoは${config.todo.maxLength}文字以内で入力してください`,
                "text",
              );
            }

            const currentTodos = get().todos;
            if (currentTodos.length >= config.todo.maxCount) {
              throw new ValidationError(
                `Todoは最大${config.todo.maxCount}個までです`,
                "todos",
              );
            }

            const now = new Date();
            const newTodo: Todo = {
              id: uuidv4(),
              text: text.trim(),
              isCompleted: false,
              createdAt: now,
              updatedAt: now,
            };

            set(
              (state) => ({
                todos: [newTodo, ...state.todos],
                error: null,
              }),
              undefined,
              "TodoStore/addTodo",
            );
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "不明なエラーが発生しました";
            set({ error: message }, undefined, "TodoStore/addTodo/error");
            throw error;
          }
        },

        toggleTodo: (id) => {
          try {
            set(
              (state) => ({
                todos: state.todos.map((todo) =>
                  todo.id === id
                    ? {
                        ...todo,
                        isCompleted: !todo.isCompleted,
                        updatedAt: new Date(),
                      }
                    : todo,
                ),
                error: null,
              }),
              undefined,
              "TodoStore/toggleTodo",
            );
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "不明なエラーが発生しました";
            set({ error: message }, undefined, "TodoStore/toggleTodo/error");
            throw error;
          }
        },

        deleteTodo: (id) => {
          try {
            set(
              (state) => ({
                todos: state.todos.filter((todo) => todo.id !== id),
                error: null,
              }),
              undefined,
              "TodoStore/deleteTodo",
            );
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "不明なエラーが発生しました";
            set({ error: message }, undefined, "TodoStore/deleteTodo/error");
            throw error;
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: config.storage.todoStoreKey,
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: "useTodoStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
