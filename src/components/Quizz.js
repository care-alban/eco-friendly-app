import { useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Quizz() {
  const [value, setValue] = useState('');
  const [helperText, setHelperText] = useState('Choose wisely');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value) {
      setHelperText('Vous devez choisir une réponse !');
    } else if (value === '1') {
      setHelperText('Bravo !');
    } else {
      setHelperText('Oups, pas de chance !');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" color="#fff" fontWeight="bold">
        Quizz
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 3 }} variant="standard">
          <FormLabel
            id="demo-error-radios"
            sx={{ color: '#fff', fontWeight: 'bold' }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit ?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
            sx={{
              color: '#fff',
              margin: '2rem',
              '& .MuiSvgIcon-root': { color: '#fff' },
            }}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Lorem ipsum dolor sit amet consectetur."
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam. Lorem"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="ipsum dolor sit amet, consectetur adipisicing. "
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="Lorem ipsum dolor sit."
            />
          </RadioGroup>
          <FormHelperText>{helperText}</FormHelperText>
          <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
            Check Answer
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}
