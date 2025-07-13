"use client";

import { TodoItem } from "@/components/TodoItem";
import { Todo } from "@/types/todo";
import { memo } from "react";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList = memo(function TodoList({
  todos,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>まだTodoがありません</p>
        <p className="mt-2 text-sm">新しいTodoを追加してみてください</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" role="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});
