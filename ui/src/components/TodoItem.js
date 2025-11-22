import React, { useState } from 'react';
import { Box, Checkbox, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleTextClick = () => {
    if (!todo.completed) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text !== todo.text && text.trim() !== '') {
      onUpdate(todo.id, text);
    } else {
      setText(todo.text);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
    if (e.key === 'Escape') {
      setText(todo.text);
      setIsEditing(false);
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

      {isEditing ? (
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          variant="standard"
          fullWidth
          autoFocus
          sx={{ flex: 1 }}
        />
      ) : (
        <Box
          onClick={handleTextClick}
          sx={{
            flex: 1,
            cursor: todo.completed ? 'default' : 'pointer',
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'text.disabled' : 'text.primary',
            userSelect: 'none'
          }}
        >
          {todo.text}
        </Box>
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
