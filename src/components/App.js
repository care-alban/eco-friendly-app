import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import HomePage from '../pages/HomePage';

import { getAllCategories } from '../actions/commonActions';

import config from '../config';

function App() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.common.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
  }, [categories]);

  return (
    <Layout>
      <Routes>
        <Route>
          <Route path={`${config.basePath}`} element={<HomePage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
