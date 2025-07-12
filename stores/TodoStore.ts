import { Todo } from "@/types/todo";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type TodoStore = {
  todos: Todo[];
  setInitialTodos: (todos: Todo[]) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        setInitialTodos: (todos) =>
          set({ todos }, undefined, "TodoStore/setInitialTodos"),
        addTodo: (text) =>
          set(
            (state) => ({
              todos: [
                { id: uuidv4(), text, isCompleted: false },
                ...state.todos,
              ],
            }),
            undefined,
            "TodoStore/addTodo",
          ),
        toggleTodo: (id) =>
          set(
            (state) => ({
              todos: state.todos.map((todo) =>
                todo.id === id
                  ? { ...todo, isCompleted: !todo.isCompleted }
                  : todo,
              ),
            }),
            undefined,
            "TodoStore/toggleTodo",
          ),
        deleteTodo: (id) =>
          set(
            (state) => ({
              todos: state.todos.filter((todo) => todo.id !== id),
            }),
            undefined,
            "TodoStore/deleteTodo",
          ),
      }),
      {
        name: "useTodoStore",
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: "useTodoStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
