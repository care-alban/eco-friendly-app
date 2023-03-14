import PropTypes from 'prop-types';

import Card from '@mui/material/Card';

export default function LargeCard({ sx, children }) {
  return <Card sx={sx}>{children}</Card>;
}

LargeCard.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
};

LargeCard.defaultProps = {
  sx: { border: 'none', boxShadow: 'none' },
};
