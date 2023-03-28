import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export default function FormNickname() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  /* Style */
  const BoxContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
    backgroundColor: theme.palette.common.white,
    borderRadius: '0.375rem',
    boxShadow:
      '0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)',
    padding: '2rem',
  }));

  return (
    <BoxContainer>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography id="title" variant="h5" component="h2" mb={4}>
          Modifier mon pseudo
        </Typography>
        <FormControl>
          <TextField
            type="text"
            name="nickname"
            id="nickname"
            label="Pseudo"
            variant="outlined"
            fullWidth
            required
            // value={nickname}
            // onChange={changeField}
          />
          <FormHelperText sx={{ marginY: 2 }}>
            {/* {helperText} */}
            message d'erreur
          </FormHelperText>
          <Stack
            spacing={2}
            direction="row"
            mb={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button type="submit" variant="contained" color="secondary">
              Valider
            </Button>
            <Button
              variant="outlined"
              type="submit"
              onClick={() => console.log('annuler')}
            >
              Annuler
            </Button>
          </Stack>
        </FormControl>
      </form>
    </BoxContainer>
  );
}
