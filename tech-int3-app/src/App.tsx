import Header from './components/global-components/Header/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListPage from './pages/ListPage/ListPage';
import ItemPage from './pages/ItemPage/ItemPage';
import StatsPage from './pages/StatsPage/StatsPage';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
