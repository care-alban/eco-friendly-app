import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/eco-friendly-app" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
