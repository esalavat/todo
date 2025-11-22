import React, { useState } from 'react';
import { Container, Box, Button, TextField, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditableText from '../components/EditableText';
import TodoItem from '../components/TodoItem';
import { mockTodoLists } from '../data/mockData';

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewList = id === 'new';

  // Find the todo list from mock data
  const initialList = isNewList
    ? { id: 'new', title: '', todos: [] }
    : mockTodoLists.find((list) => list.id === parseInt(id)) || { id, title: 'Not Found', todos: [] };

  const [todoList, setTodoList] = useState(initialList);
  const [newTodoText, setNewTodoText] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleTitleChange = (newTitle) => {
    setTodoList({ ...todoList, title: newTitle });
  };

  const handleToggleTodo = (todoId) => {
    setTodoList({
      ...todoList,
      todos: todoList.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    });
  };

  const handleUpdateTodo = (todoId, newText) => {
    setTodoList({
      ...todoList,
      todos: todoList.todos.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      )
    });
  };

  const handleDeleteTodo = (todoId) => {
    setTodoList({
      ...todoList,
      todos: todoList.todos.filter((todo) => todo.id !== todoId)
    });
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;

    const newTodo = {
      id: Math.max(0, ...todoList.todos.map((t) => t.id)) + 1,
      text: newTodoText.trim(),
      completed: false
    };

    setTodoList({
      ...todoList,
      todos: [...todoList.todos, newTodo]
    });

    setNewTodoText('');
  };

  const handleNewTodoKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo(e);
    }
  };

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
