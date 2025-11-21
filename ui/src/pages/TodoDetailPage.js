import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewList = id === 'new';

  const handleBack = () => {
    navigate('/');
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

        <Typography variant="h2" component="h1" gutterBottom>
          {isNewList ? 'New Todo List' : `Todo List #${id}`}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Todo detail page placeholder - to be implemented
        </Typography>
      </Box>
    </Container>
  );
};

export default TodoDetailPage;
