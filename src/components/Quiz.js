import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

export default function Quiz({ quiz }) {
  const { question, article, answers } = quiz;

  const [value, setValue] = useState('');
  const [helperText, setHelperText] = useState('Choisissez sagement...');
  const [answer, setAnswer] = useState({});
  const [showLink, setShowLink] = useState(false);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value) {
      /* find answer by id */
      setAnswer(quiz.answers.find((a) => a.id === parseInt(value, 10)));
    }
  }, [value, helperText]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) {
      setHelperText("Vous n'avez pas encore choisi de réponse !");
    } else if (answer.correct) {
      setHelperText(
        'Bravo, si vous souhaitez en savoir plus sur le sujet, vous pouvez consulter l’article associé en cliquant sur le lien : ',
      );
      setShowLink(true);
    } else {
      setHelperText(
        "Oups, malheuresement ce n'est pas la bonne réponse ! Mais si voulez tout savoir sur le sujet, vous pouvez consulter l’article associé en cliquant sur le lien : ",
      );
      setShowLink(true);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" color="#fff" fontWeight="bold">
        Quizz
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: '100%' }} variant="standard">
          <FormLabel
            id="data-radios"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              '&.MuiFormLabel-colorPrimary': {
                color: 'common.white',
              },
            }}
          >
            {question}
          </FormLabel>
          <FormHelperText sx={{ color: '#fff' }}>
            {helperText}
            {showLink && (
              <Link
                component={RouterLink}
                to={`/articles/${article.id}/${article.slug}`}
                sx={{ mt: 1, mr: 1 }}
                color="inherit"
              >
                {article.title}
              </Link>
            )}
          </FormHelperText>

          <RadioGroup
            aria-labelledby="data-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
            sx={{
              color: '#fff',
              margin: '2rem',
              '& .MuiSvgIcon-root': { color: '#fff' },
            }}
          >
            {answers.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.content}
              />
            ))}
          </RadioGroup>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{ mt: 1, mr: 1 }}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Vérifier la réponse
            </Button>
          </Box>
        </FormControl>
      </form>
    </Container>
  );
}

Quiz.propTypes = {
  quiz: PropTypes.shape({
    question: PropTypes.string.isRequired,
    article: PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
