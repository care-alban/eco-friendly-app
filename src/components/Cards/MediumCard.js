import PropTypes from 'prop-types';

import Card from '@mui/material/Card';

export default function MediumCard({ sx, children }) {
  return <Card sx={sx}>{children}</Card>;
}

MediumCard.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
};

MediumCard.defaultProps = {
  sx: { border: 'none', boxShadow: 'none' },
};
