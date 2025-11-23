import React, { useState, useEffect } from 'react';
import { Container, Box, Button, TextField, Divider, CircularProgress, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditableText from '../components/EditableText';
import TodoItem from '../components/TodoItem';
import todoService from '../services/todoService';

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewList = id === 'new';

  const [todoList, setTodoList] = useState(null);
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(!isNewList);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isNewList) {
      loadTodoList();
    } else {
      setTodoList({ id: null, title: '', todos: [] });
    }
  }, [id, isNewList]);

  const loadTodoList = async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await todoService.getTodoListById(id);
      setTodoList(list);
    } catch (err) {
      setError('Failed to load todo list. Please make sure the API server is running.');
      console.error('Error loading todo list:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleTitleChange = async (newTitle) => {
    if (isNewList && todoList.id === null) {
      // Create new list
      try {
        const createdList = await todoService.createTodoList(newTitle);
        setTodoList(createdList);
        // Update URL to reflect the new list ID
        navigate(`/list/${createdList.id}`, { replace: true });
      } catch (err) {
        setError('Failed to create todo list.');
        console.error('Error creating todo list:', err);
      }
    } else if (todoList.id) {
      // Update existing list title
      try {
        const updated = await todoService.updateTodoList(todoList.id, newTitle);
        setTodoList({ ...todoList, title: updated.title });
      } catch (err) {
        setError('Failed to update list title.');
        console.error('Error updating title:', err);
      }
    } else {
      // Just update local state for new list before it's saved
      setTodoList({ ...todoList, title: newTitle });
    }
  };

  const handleToggleTodo = async (todoId) => {
    if (!todoList.id) return;

    try {
      const updatedTodo = await todoService.toggleTodo(todoList.id, todoId);
      setTodoList({
        ...todoList,
        todos: todoList.todos.map((todo) =>
          todo.id === todoId ? updatedTodo : todo
        )
      });
    } catch (err) {
      setError('Failed to toggle todo.');
      console.error('Error toggling todo:', err);
    }
  };

  const handleUpdateTodo = async (todoId, newText) => {
    if (!todoList.id) return;

    const todo = todoList.todos.find(t => t.id === todoId);
    if (!todo) return;

    try {
      const updatedTodo = await todoService.updateTodo(todoList.id, todoId, newText, todo.completed);
      setTodoList({
        ...todoList,
        todos: todoList.todos.map((t) =>
          t.id === todoId ? updatedTodo : t
        )
      });
    } catch (err) {
      setError('Failed to update todo.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (!todoList.id) return;

    try {
      await todoService.deleteTodo(todoList.id, todoId);
      setTodoList({
        ...todoList,
        todos: todoList.todos.filter((todo) => todo.id !== todoId)
      });
    } catch (err) {
      setError('Failed to delete todo.');
      console.error('Error deleting todo:', err);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;
    if (!todoList.id) {
      setError('Please save the list by adding a title first.');
      return;
    }

    try {
      const newTodo = await todoService.createTodo(todoList.id, newTodoText.trim());
      setTodoList({
        ...todoList,
        todos: [...todoList.todos, newTodo]
      });
      setNewTodoText('');
    } catch (err) {
      setError('Failed to add todo.');
      console.error('Error adding todo:', err);
    }
  };

  const handleNewTodoKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo(e);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error && !todoList) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{error}</Alert>
          <Button onClick={handleBack} sx={{ mt: 2 }}>
            Back to Lists
          </Button>
        </Box>
      </Container>
    );
  }

  if (!todoList) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Lists
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <EditableText
          value={todoList.title}
          onChange={handleTitleChange}
          variant="h2"
          component="h1"
          placeholder="Enter list title"
          sx={{ mb: 3 }}
        />

        <Divider sx={{ mb: 2 }} />

        <Box>
          {todoList.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))}

          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', px: 1, py: 1 }}>
            <Box sx={{ width: 42, mr: 1 }} />
            <TextField
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={handleNewTodoKeyDown}
              placeholder="Add a new todo..."
              variant="standard"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoDetailPage;
