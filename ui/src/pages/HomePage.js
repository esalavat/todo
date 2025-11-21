import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TodoListCard from '../components/TodoListCard';
import { mockTodoLists } from '../data/mockData';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
  const navigate = useNavigate();

  const handleAddNewList = () => {
    navigate('/list/new');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Todo Lists
        </Typography>

        <Box sx={{ mt: 3 }}>
          {mockTodoLists.map((todoList) => (
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
