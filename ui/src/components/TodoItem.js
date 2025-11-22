import React, { useState } from 'react';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableText from './EditableText';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleTextChange = (newText) => {
    if (newText.trim() !== '') {
      onUpdate(todo.id, newText);
    }
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        px: 1,
        '&:hover': {
          backgroundColor: 'action.hover'
        }
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        sx={{ mr: 1 }}
      />

      {todo.completed ? (
        <Typography
          sx={{
            flex: 1,
            textDecoration: 'line-through',
            color: 'text.disabled',
            userSelect: 'none'
          }}
        >
          {todo.text}
        </Typography>
      ) : (
        <EditableText
          value={todo.text}
          onChange={handleTextChange}
          variant="body1"
          placeholder="Enter todo text"
          sx={{
            flex: 1,
            textDecoration: 'none',
            color: 'text.primary'
          }}
        />
      )}

      {isHovered && (
        <IconButton
          onClick={() => onDelete(todo.id)}
          size="small"
          sx={{ ml: 1 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default TodoItem;
