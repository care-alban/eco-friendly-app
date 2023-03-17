import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { searchBarOnChange } from '../actions/commonActions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function SearchBar({ array, keys }) {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    /* Search a value in an array */
    if (array.lenght > 0 && keys.lenght > 0) {
      /* Filter the articles and advices by search value */
      const filteredArray = array.filter((item) =>
        keys.map((key) =>
          item[key].toLowerCase().includes(event.target.value.toLowerCase()),
        ),
      );
      dispatch(searchBarOnChange(filteredArray));
    }
  };
  /* TODO: Use debouncer to avoid too many requests */
  /* TODO: Filter the articles and advices by search value */

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{
          'aria-label': 'search',
        }}
        onChange={handleChange}
      />
    </Search>
  );
}

SearchBar.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object),
  keys: PropTypes.arrayOf(PropTypes.string),
};

SearchBar.defaultProps = {
  array: [],
  keys: [],
};
