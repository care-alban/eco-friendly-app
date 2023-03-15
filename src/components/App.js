import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';

import { getArticles } from '../actions/articlesActions';
import { getAdvices } from '../actions/advicesActions';

import config from '../config';

function App() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.list);
  const advices = useSelector((state) => state.advices.list);

  useEffect(() => {
    const params = [
      { name: 'limit', value: 8 },
      { name: 'sorttype', value: 'created_at' },
      { name: 'order', value: 'desc' },
    ];
    if (articles.length === 0) dispatch(getArticles(params));
    if (advices.length === 0) dispatch(getAdvices(params));
  }, [articles, advices]);

  return (
    <Routes>
      <Route>
        <Route path={`${config.basePath}`} element={<HomePage />} />
        <Route
          path={`${config.basePath}/categories/:name`}
          element={<CategoryPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
