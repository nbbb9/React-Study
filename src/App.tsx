import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import './App.css'
import AppRouter from './router'

function App() {

  const AppRoutes = () => useRoutes(AppRouter);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;