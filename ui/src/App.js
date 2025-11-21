import './App.css';
import { Container, Typography, Box } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Todo List App
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
