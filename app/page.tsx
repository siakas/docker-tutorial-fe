"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/stores/TodoStore";
import { useState } from "react";

export default function Home() {
  const [newTodoText, setNewTodoText] = useState("");

  const todos = useTodoStore((state) => state.todos);
  const setInitialTodos = useTodoStore((state) => state.setInitialTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Todo App
        </h1>

        <div className="flex space-x-2">
          <Input
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            placeholder="新しいTodoを入力"
          />
          <Button onClick={handleAddTodo}>追加</Button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-md bg-gray-50 p-3 shadow-sm"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                  "cursor-pointer",
                  todo.isCompleted
                    ? "text-gray-400 line-through"
                    : "text-gray-800",
                )}
              >
                {todo.text}
              </button>
              <Button onClick={() => deleteTodo(todo.id)}>削除</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
