export const config = {
  todo: {
    maxLength: 100,
    maxCount: 1000,
  },
  storage: {
    todoStoreKey: "todo-store",
  },
  ui: {
    debounceDelay: 300,
  },
} as const;

export type Config = typeof config;
