// Mock data for todo lists
// This will be replaced with API calls later

export const mockTodoLists = [
  {
    id: 1,
    title: 'Shopping List',
    completedCount: 2,
    totalCount: 5,
    todos: [
      { id: 1, text: 'Buy milk', completed: true },
      { id: 2, text: 'Buy eggs', completed: false },
      { id: 3, text: 'Buy bread', completed: true },
      { id: 4, text: 'Buy butter', completed: false },
      { id: 5, text: 'Buy coffee', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Work Tasks',
    completedCount: 5,
    totalCount: 8,
    todos: [
      { id: 1, text: 'Review pull requests', completed: true },
      { id: 2, text: 'Update documentation', completed: true },
      { id: 3, text: 'Fix bug #123', completed: false },
      { id: 4, text: 'Refactor auth module', completed: true },
      { id: 5, text: 'Write unit tests', completed: false },
      { id: 6, text: 'Deploy to staging', completed: true },
      { id: 7, text: 'Team meeting notes', completed: true },
      { id: 8, text: 'Update project roadmap', completed: false }
    ]
  },
  {
    id: 3,
    title: 'Personal Goals',
    completedCount: 1,
    totalCount: 3,
    todos: [
      { id: 1, text: 'Exercise 3x per week', completed: false },
      { id: 2, text: 'Read 2 books this month', completed: true },
      { id: 3, text: 'Learn React hooks', completed: false }
    ]
  },
  {
    id: 4,
    title: 'Home Improvements',
    completedCount: 4,
    totalCount: 12,
    todos: [
      { id: 1, text: 'Paint living room', completed: true },
      { id: 2, text: 'Fix leaky faucet', completed: false },
      { id: 3, text: 'Replace light fixtures', completed: true },
      { id: 4, text: 'Install shelves', completed: false },
      { id: 5, text: 'Clean gutters', completed: false },
      { id: 6, text: 'Organize garage', completed: true },
      { id: 7, text: 'Plant flowers', completed: false },
      { id: 8, text: 'Repair fence', completed: false },
      { id: 9, text: 'Update thermostat', completed: true },
      { id: 10, text: 'Clean carpets', completed: false },
      { id: 11, text: 'Replace air filters', completed: false },
      { id: 12, text: 'Trim bushes', completed: false }
    ]
  }
];
