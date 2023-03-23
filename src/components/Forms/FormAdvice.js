import { useSelector } from 'react-redux';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';

export default function FormAdvice() {
  const isShow = useSelector((state) => state.common.showAdviceForm);
  const categories = useSelector((state) => state.common.categories);

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 2,
        '&.MuiPaper-root': { display: isShow ? 'block' : 'none' },
      }}
    >
      <Typography variant="h4" component="h2" color="inherit">
        Ajouter un conseil
      </Typography>
      <form noValidate autoComplete="off">
        <Box
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
        >
          <FormControl
            sx={{
              width: { sx: '100%', md: '80%' },
              marginTop: 2,
              paddingRight: { sx: 0, md: 2 },
            }}
          >
            <TextField
              name="title"
              // onChange={changeField}
              // value={email}
              type="text"
              label="Titre du conseil"
              placeholder="Ajouter un titre"
              variant="outlined"
              fullWidth
              required
            />
          </FormControl>
          <FormControl sx={{ width: { sx: '100%', md: '20%' }, marginTop: 2 }}>
            <InputLabel id="category-label">Catégorie</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              // value={age}
              label="Catégorie"
              // onChange={handleChange}
              required
              defaultValue=""
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl sx={{ width: '100%', marginTop: 2 }}>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
          />
        </FormControl>
      </form>
    </Paper>
  );
}
