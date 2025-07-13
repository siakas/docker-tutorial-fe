"use client";

import { X } from "lucide-react";
import { memo } from "react";

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage = memo(function ErrorMessage({
  message,
  onClose,
}: ErrorMessageProps) {
  return (
    <div className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 text-red-500 hover:text-red-700"
            aria-label="エラーメッセージを閉じる"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
});
