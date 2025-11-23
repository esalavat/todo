import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const todoService = {
  // TodoList endpoints
  getTodoLists: async () => {
    const response = await axios.get(`${API_BASE_URL}/todolists`);
    return response.data;
  },

  getTodoListById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/todolists/${id}`);
    return response.data;
  },

  createTodoList: async (title) => {
    const response = await axios.post(`${API_BASE_URL}/todolists`, { title });
    return response.data;
  },

  updateTodoList: async (id, title) => {
    const response = await axios.put(`${API_BASE_URL}/todolists/${id}`, { title });
    return response.data;
  },

  deleteTodoList: async (id) => {
    await axios.delete(`${API_BASE_URL}/todolists/${id}`);
  },

  // Todo endpoints
  createTodo: async (listId, text) => {
    const response = await axios.post(`${API_BASE_URL}/todolists/${listId}/todos`, { text });
    return response.data;
  },

  updateTodo: async (listId, todoId, text, completed) => {
    const response = await axios.put(`${API_BASE_URL}/todolists/${listId}/todos/${todoId}`, {
      text,
      completed
    });
    return response.data;
  },

  toggleTodo: async (listId, todoId) => {
    const response = await axios.patch(`${API_BASE_URL}/todolists/${listId}/todos/${todoId}/toggle`);
    return response.data;
  },

  deleteTodo: async (listId, todoId) => {
    await axios.delete(`${API_BASE_URL}/todolists/${listId}/todos/${todoId}`);
  }
};

export default todoService;
