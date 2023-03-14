import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';

import { getAllCategories } from '../actions/commonActions';
import { getArticles } from '../actions/articlesActions';

import config from '../config';

function App() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.common.categories);
  const articles = useSelector((state) => state.articles.list);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
    if (articles.length === 0) {
      dispatch(getArticles(18));
    }
  }, [categories, articles]);

  return (
    <Routes>
      <Route>
        <Route path={`${config.basePath}`} element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
