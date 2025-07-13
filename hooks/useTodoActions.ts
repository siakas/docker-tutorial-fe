import { useTodoStore } from "@/stores/TodoStore";

export function useTodoActions() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleAddTodo = (text: string) => {
    try {
      if (!text.trim()) {
        throw new Error("Todoのテキストを入力してください");
      }

      if (text.length > 100) {
        throw new Error("Todoは100文字以内で入力してください");
      }

      addTodo(text);
    } catch (error) {
      console.error("Todo追加エラー:", error);
      // ここでエラー通知を実装できます
    }
  };

  const handleToggleTodo = (id: string) => {
    try {
      toggleTodo(id);
    } catch (error) {
      console.error("Todo切り替えエラー:", error);
    }
  };

  const handleDeleteTodo = (id: string) => {
    try {
      deleteTodo(id);
    } catch (error) {
      console.error("Todo削除エラー:", error);
    }
  };

  return {
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
  };
}
