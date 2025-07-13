export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoFormData = {
  text: string;
};

export type TodoFilters = {
  showCompleted: boolean;
  searchQuery: string;
};

export type TodoError = {
  message: string;
  code: string;
};
