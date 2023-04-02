import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { Hero, Layout, Loader } from '../components';
import { ArticlesMediumCard } from '../components/Cards';

import { getArticles } from '../actions/articlesActions';

export default function ArticlesPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('desc');
  const [articles, setArticles] = useState([]);
  const categories = useSelector((state) => state.common.categories);
  const articlesList = useSelector((state) => state.articles.listPerPage);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const params = [
      { name: 'page', value: page },
      { name: 'sorttype', value: 'updated_at' },
    ];
    if (category !== 'All') {
      params.push({ name: 'category', value: category });
    }
    if (sortBy !== 'desc') {
      params.push({ name: 'order', value: sortBy });
    }
    dispatch(getArticles(params));
  }, [page, category]);

  useEffect(() => {
    setArticles(articlesList);
  }, [articlesList]);

  /* controls */
  const handlePageChange = () => {
    setPage(page + 1);
  };

  const changeFieldCategories = (e) => {
    setPage(1);
    setCategory(e.target.value);
  };

  const changeFieldSortBy = (e) => {
    setSortBy(e.target.value);
    articles.reverse();
  };

  /* loader */
  if (articles.length === 0) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero
        title="Articles"
        subtitle="Découvrez tous nos articles"
        image="https://cdn.eco-friendly.fr/assets/img/misc/articles.webp"
      />
      <Box
        sx={{
          marginY: 2,
          marginX: 0,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box position="relative" sx={{ flexGrow: 1 }}>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              console.log(e.target.value);
            }}
            label="Rechercher"
            variant="outlined"
            placeholder="Recherche..."
            size="small"
            fullWidth
          />
          <IconButton
            type="submit"
            aria-label="search"
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              m: 'auto',
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <FormControl sx={{ mx: 2 }}>
          <InputLabel id="category-label">Catégorie</InputLabel>
          <Select
            name="category"
            labelId="category-label"
            id="category"
            label="Catégorie"
            value={category}
            onChange={changeFieldCategories}
            size="small"
          >
            <MenuItem value="All">Toutes les catégories</MenuItem>
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="category-label">Trier par</InputLabel>
          <Select
            name="sortby"
            labelId="sortby-label"
            id="sortby"
            label="Trier par"
            value={sortBy}
            onChange={changeFieldSortBy}
            size="small"
          >
            <MenuItem value="desc">le plus récent</MenuItem>
            <MenuItem value="asc">le plus ancien</MenuItem>
            {/* <MenuItem value="author">auteur</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={`${article.id}`}>
            <ArticlesMediumCard article={article} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          flexGrow: 1,
          marginY: 2,
          marginX: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={handlePageChange} variant="contained">
          Voir plus d'articles...
        </Button>
      </Box>
    </Layout>
  );
}
