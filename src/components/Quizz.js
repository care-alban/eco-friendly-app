import { useState } from 'react';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

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
        <FormControl sx={{ width: '100%' }} variant="standard">
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
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{ mt: 1, mr: 1 }}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Check Answer
            </Button>
          </Box>
        </FormControl>
      </form>
    </Container>
  );
}
