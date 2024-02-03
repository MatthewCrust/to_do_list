import SeznamPage from './SeznamPage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<SeznamPage />} />
    </Routes>
  </Router>
  );
}

export default App;
