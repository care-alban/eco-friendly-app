import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';
import ArticlePage from '../pages/ArticlePage';
import ArticlesPage from '../pages/ArticlesPage';
import AdvicePage from '../pages/AdvicePage';
import AdvicesPage from '../pages/AdvicesPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import UserProfilePage from '../pages/UserProfilePage';
import RegistrationPage from '../pages/RegistrationPage';
import ValidationPage from '../pages/ValidationPage';
import LegalNoticePage from '../pages/LegalNoticePage';
import NotFoundPage from '../pages/NotFoundPage';

function App() {
  const token = useSelector((state) => state.user.token);

  return (
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories/:name" element={<CategoryPage />} />
        <Route path="/articles/:id/:slug" element={<ArticlePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/conseils/:id/:slug" element={<AdvicePage />} />
        <Route path="/conseils" element={<AdvicesPage />} />
        <Route path="/connexion" element={<SignInPage />} />
        <Route path="/inscription" element={<SignUpPage />} />
        <Route path="/enregistrement" element={<RegistrationPage />} />
        <Route path="/validation" element={<ValidationPage />} />
        <Route path="/mentions-legales" element={<LegalNoticePage />} />
        {token && (
          <Route path="/utilisateurs/:nickname" element={<UserProfilePage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
