import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import RichTextEditor from '../RichTextEditor';

export default function FormAdvice() {
  const isShow = useSelector((state) => state.common.showAdviceForm);
  const categories = useSelector((state) => state.common.categories);
  const RichTextEditorValue = '';

  const handleTextFieldChange = (event) => {
    console.log(event.target.value);
  };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
  };

  const handleRichTextEditorChange = (value) => {
    console.log(value);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 2,
        marginBottom: 2,
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
              type="text"
              name="title"
              label="Titre du conseil"
              placeholder="Ajouter un titre"
              variant="outlined"
              fullWidth
              required
              // value={email}
              onChange={handleTextFieldChange}
            />
          </FormControl>
          <FormControl sx={{ width: { sx: '100%', md: '20%' }, marginTop: 2 }}>
            <InputLabel id="category-label">Catégorie</InputLabel>
            <Select
              name="category"
              labelId="category-label"
              id="category"
              label="Catégorie"
              defaultValue=""
              required
              // value={category}
              onChange={handleSelectChange}
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
          <RichTextEditor
            name="description"
            placeholder="Ajouter un conseil"
            value={RichTextEditorValue}
            onChange={handleRichTextEditorChange}
          />
        </FormControl>
        <Stack
          spacing={2}
          direction="row"
          marginTop={2}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button variant="contained" color="secondary">
            Publier
          </Button>
          <Button variant="contained" color="primary">
            Sauvegarder
          </Button>
          <Button variant="outlined">Annuler</Button>
        </Stack>
      </form>
    </Paper>
  );
}
