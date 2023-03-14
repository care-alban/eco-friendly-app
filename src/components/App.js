import { Routes, Route } from 'react-router-dom';
import config from '../config';

import HomePage from '../pages/HomePage';

function App() {
  return (
    <Routes>
      <Route>
        <Route path={`${config.basePath}`} element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
