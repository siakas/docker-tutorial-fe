"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TodoFormProps {
  onAddTodo: (text: string) => void;
  disabled?: boolean;
}

export function TodoForm({ onAddTodo, disabled = false }: TodoFormProps) {
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim() && !disabled) {
      onAddTodo(newTodoText.trim());
      setNewTodoText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="新しいTodoを入力"
        disabled={disabled}
        aria-label="新しいTodoを入力"
      />
      <Button
        onClick={handleAddTodo}
        disabled={disabled || !newTodoText.trim()}
        aria-label="Todoを追加"
      >
        追加
      </Button>
    </div>
  );
}
