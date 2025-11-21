import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TodoListCard = ({ todoList }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/list/${todoList.id}`);
  };

  const uncompletedCount = todoList.totalCount - todoList.completedCount;

  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h2">
              {todoList.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {uncompletedCount}/{todoList.totalCount}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TodoListCard;
