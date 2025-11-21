import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodoDetailPage from './pages/TodoDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list/:id" element={<TodoDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
