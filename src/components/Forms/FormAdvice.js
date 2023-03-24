import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import {
  onInputChange,
  toManageAdvice,
  getAdvices,
} from '../../actions/advicesActions';
import { toggleShowAdviceForm } from '../../actions/commonActions';

export default function FormAdvice() {
  const dispatch = useDispatch();
  /* Get the button name clicked */
  const [buttonName, setButtonName] = useState(null);
  const isShow = useSelector((state) => state.common.showAdviceForm);
  const categories = useSelector((state) => state.common.categories);
  const title = useSelector((state) => state.advices.title);
  const category = useSelector((state) => state.advices.category);
  const content = useSelector((state) => state.advices.content);
  const isSubmitted = useSelector((state) => state.advices.isSubmitted);

  /* link field to state */
  const changeField = (e) => {
    dispatch(onInputChange(e.target.value, e.target.name));
  };

  const handleRichTextEditorChange = (value) => {
    dispatch(onInputChange(value, 'content'));
  };

  /* Submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (buttonName === 'publish') {
      dispatch(toManageAdvice({ title, category, content }, null, 1));
    }
    if (buttonName === 'save') {
      dispatch(toManageAdvice({ title, category, content }, null, 0));
    }
    if (buttonName === 'cancel') {
      dispatch(onInputChange('', 'title'));
      dispatch(onInputChange('', 'category'));
      dispatch(onInputChange('', 'content'));
    }
    dispatch(toggleShowAdviceForm());
  };

  useEffect(() => {
    dispatch(getAdvices());
  }, [isSubmitted]);

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
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
              value={title}
              onChange={changeField}
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
              value={category}
              onChange={changeField}
            >
              {categories.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl sx={{ width: '100%', marginTop: 2 }}>
          <RichTextEditor
            name="content"
            value={content}
            onChange={handleRichTextEditorChange}
          />
        </FormControl>
        <Stack
          spacing={2}
          direction="row"
          marginTop={2}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => setButtonName('publish')}
          >
            Publier
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => setButtonName('save')}
          >
            Sauvegarder
          </Button>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => setButtonName('cancel')}
          >
            Annuler
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
