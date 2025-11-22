import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField } from '@mui/material';

const EditableText = ({
  value,
  onChange,
  variant = 'body1',
  placeholder = 'Click to edit',
  component = 'p',
  sx = {}
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text !== value) {
      onChange(text);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === 'Escape') {
      setText(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <TextField
        inputRef={inputRef}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        variant="standard"
        fullWidth
        placeholder={placeholder}
        sx={{ ...sx }}
      />
    );
  }

  return (
    <Typography
      variant={variant}
      component={component}
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover'
        },
        ...sx
      }}
    >
      {value || placeholder}
    </Typography>
  );
};

export default EditableText;
