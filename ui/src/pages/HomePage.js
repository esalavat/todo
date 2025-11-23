import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TodoListCard from '../components/TodoListCard';
import todoService from '../services/todoService';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
  const navigate = useNavigate();
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodoLists();
  }, []);

  const loadTodoLists = async () => {
    try {
      setLoading(true);
      setError(null);
      const lists = await todoService.getTodoLists();
      setTodoLists(lists);
    } catch (err) {
      setError('Failed to load todo lists. Please make sure the API server is running.');
      console.error('Error loading todo lists:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewList = () => {
    navigate('/list/new');
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

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Todo Lists
        </Typography>

        <Box sx={{ mt: 3 }}>
          {todoLists.map((todoList) => (
            <TodoListCard key={todoList.id} todoList={todoList} />
          ))}
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNewList}
            size="large"
          >
            Add New Todo List
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
