import React, { useState, useEffect } from 'react';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableText from './EditableText';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device supports hover (desktop) or is touch-only (mobile/tablet)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    setIsTouchDevice(!hasHover);
  }, []);

  const handleTextChange = (newText) => {
    if (newText.trim() !== '') {
      onUpdate(todo.id, newText);
    }
  };

  const showDeleteButton = isTouchDevice || isHovered;

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

      {showDeleteButton && (
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
