import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';

import { getAllCategories } from '../actions/commonActions';
import { getArticles } from '../actions/articlesActions';
import { getAdvices } from '../actions/advicesActions';

import config from '../config';

function App() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.common.categories);
  const articles = useSelector((state) => state.articles.list);
  const advices = useSelector((state) => state.advices.list);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getAllCategories());
    }
    if (articles.length === 0) {
      dispatch(
        getArticles([
          { name: 'limit', value: 18 },
          { name: 'sorttype', value: 'created_at' },
          { name: 'order', value: 'desc' },
        ]),
      );
    }
    if (advices.length === 0) {
      dispatch(
        getAdvices([
          { name: 'limit', value: 8 },
          { name: 'sorttype', value: 'created_at' },
          { name: 'order', value: 'desc' },
        ]),
      );
    }
  }, [categories, articles, advices]);

  return (
    <Routes>
      <Route>
        <Route path={`${config.basePath}`} element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
