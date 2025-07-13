export class TodoError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "TodoError";
  }
}

export class ValidationError extends TodoError {
  constructor(message: string, field?: string) {
    super(message, "VALIDATION_ERROR", { field });
    this.name = "ValidationError";
  }
}

export class StorageError extends TodoError {
  constructor(message: string) {
    super(message, "STORAGE_ERROR");
    this.name = "StorageError";
  }
}
