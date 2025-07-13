"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/todo";
import { Trash2 } from "lucide-react";
import { memo } from "react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li className="flex items-center justify-between rounded-md bg-gray-50 p-3 shadow-sm">
      <button
        onClick={handleToggle}
        className={cn(
          "flex-1 cursor-pointer text-left",
          todo.isCompleted ? "text-gray-400 line-through" : "text-gray-800",
        )}
        aria-label={`${todo.isCompleted ? "完了済み" : "未完了"}: ${todo.text}`}
        aria-pressed={todo.isCompleted}
      >
        {todo.text}
      </button>
      <Button
        onClick={handleDelete}
        size="icon"
        variant="ghost"
        aria-label={`${todo.text}を削除`}
        className="ml-2"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
});
