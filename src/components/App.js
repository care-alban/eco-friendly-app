import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';
import ArticlePage from '../pages/ArticlePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

import { getArticles } from '../actions/articlesActions';
import { getAdvices } from '../actions/advicesActions';

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
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:name" element={<CategoryPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/connexion" element={<SignInPage />} />
        <Route path="/inscription" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
