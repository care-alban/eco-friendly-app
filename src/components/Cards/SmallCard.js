import PropTypes from 'prop-types';

import Card from '@mui/material/Card';

export default function SmallCard({ sx, children }) {
  return <Card sx={sx}>{children}</Card>;
}

SmallCard.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
};

SmallCard.defaultProps = {
  sx: { maxWidth: 345 },
};
