"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { useTodoActions } from "@/hooks/useTodoActions";
import { useTodoStore } from "@/stores/TodoStore";
import { useEffect } from "react";

export default function Home() {
  const todos = useTodoStore((state) => state.todos);
  const error = useTodoStore((state) => state.error);
  const clearError = useTodoStore((state) => state.clearError);
  const { handleAddTodo, handleToggleTodo, handleDeleteTodo } =
    useTodoActions();

  // エラーが発生した場合、3秒後に自動でクリア
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Todo App
        </h1>

        {error && <ErrorMessage message={error} onClose={clearError} />}

        <TodoForm onAddTodo={handleAddTodo} />

        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />

        {todos.length > 0 && (
          <div className="text-center text-sm text-gray-500">
            {todos.filter((todo) => todo.isCompleted).length} / {todos.length}{" "}
            完了
          </div>
        )}
      </div>
    </div>
  );
}
