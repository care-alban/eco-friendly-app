import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
  getAdvices,
  advicesOnInputChange,
  toggleShowAdviceForm,
  toManageAdvice,
} from '../../actions/advicesActions';

import { clearMessages } from '../../actions/commonActions';

import { hasKey } from '../../utils';

export default function FormAdvice() {
  const dispatch = useDispatch();
  /* Get the button name clicked */
  const [buttonName, setButtonName] = useState(null);
  /* Get the state of the form */
  const isShow = useSelector((state) => state.advices.showAdviceForm);
  /* Control fields */
  const categories = useSelector((state) => state.common.categories);
  const id = useSelector((state) => state.advices.id);
  const title = useSelector((state) => state.advices.title);
  const category = useSelector((state) => state.advices.category);
  const content = useSelector((state) => state.advices.content);
  /* Control if the form is successfully submitted */
  const isSubmitted = useSelector((state) => state.advices.isSubmitted);
  const errors = useSelector((state) => state.advices.messages.error);

  /* link field to state */
  const changeField = (e) => {
    dispatch(clearMessages());
    dispatch(advicesOnInputChange(e.target.value, e.target.name));
  };

  const handleRichTextEditorChange = (value) => {
    dispatch(clearMessages());
    dispatch(advicesOnInputChange(value, 'content'));
  };

  /* Submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearMessages());
    if (buttonName === 'publish') {
      if (id) {
        dispatch(toManageAdvice({ title, category, content }, id, 1));
      } else {
        dispatch(toManageAdvice({ title, category, content }, null, 1));
      }
    }
    if (buttonName === 'save') {
      if (id) {
        dispatch(toManageAdvice({ title, category, content }, id, 0));
      } else {
        dispatch(toManageAdvice({ title, category, content }, null, 0));
      }
    }
    if (buttonName === 'cancel') {
      dispatch(advicesOnInputChange('', 'title'));
      dispatch(advicesOnInputChange('', 'category'));
      dispatch(advicesOnInputChange('', 'content'));
      dispatch(toggleShowAdviceForm());
    }
  };

  useEffect(() => {
    dispatch(clearMessages());
  }, []);

  /* Actions if the form is successfully submitted */
  useEffect(() => {
    if (!errors && isShow) {
      dispatch(toggleShowAdviceForm());
    }
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
              error={
                errors && hasKey(errors, 'title') && errors.title.length > 0
              }
              helperText={
                errors &&
                hasKey(errors, 'title') &&
                errors.title.length > 0 &&
                errors.title.map((err) => err)
              }
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
              required
              value={categories}
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
          <FormHelperText
            error={
              errors && hasKey(errors, 'content') && errors.content.length > 0
            }
          >
            {errors &&
              hasKey(errors, 'content') &&
              errors.content.length > 0 &&
              errors.content.map((err) => err)}
          </FormHelperText>
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
