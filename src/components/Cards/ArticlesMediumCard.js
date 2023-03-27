import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import TruncateContent from '../TruncateContent';

export default function ArticlesMediumCard({ article }) {
  return (
    <Card
      sx={{
        boder: 1,
        maxWidth: { xs: '100%', md: '100%' },
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}
    >
      <CardActionArea
        LinkComponent={RouterLink}
        to={`/articles/${article.slug}`}
      >
        <CardMedia
          component="img"
          height="200"
          image={article.picture}
          alt={article.title}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 240,
          }}
        >
          <Box>
            <TruncateContent lines={2}>
              <Typography
                gutterBottom
                variant="h6"
                component="h3"
                sx={{ minHeight: { md: '4rem' } }}
              >
                {article.title}
              </Typography>
            </TruncateContent>
            {article.author && (
              <Typography variant="body2" color="text.secondary" component="h6">
                Redigé par {article.author.nickname}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" component="span">
              {article.updated_at
                ? `Mis à jour le ${new Date(
                    article.updated_at,
                  ).toLocaleDateString()}`
                : `Publié le ${new Date(
                    article.created_at,
                  ).toLocaleDateString()}`}
            </Typography>
          </Box>
          <TruncateContent lines={3}>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </TruncateContent>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ArticlesMediumCard.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    picture: PropTypes.string,
    contributor: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      nickname: PropTypes.string,
    }),
    updated_at: PropTypes.string,
    created_at: PropTypes.string,
    content: PropTypes.string.isRequired,
  }),
};

ArticlesMediumCard.defaultProps = {
  article: {
    picture: null,
    contributor: {
      id: null,
      nickname: '',
    },
    author: {
      nickname: '',
    },
    created_at: '',
    updated_at: '',
  },
};
