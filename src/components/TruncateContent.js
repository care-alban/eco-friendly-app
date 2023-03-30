import PropTypes from 'prop-types';

import styled from '@emotion/styled';

export default function TruncateContent({ children, lines }) {
  const Truncate = styled.div`
    overflow: hidden;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;
    -webkit-hyphens: auto;
    hyphens: auto;
    min-height: calc(${lines} * 1.8rem);
  `;

  return <Truncate>{children}</Truncate>;
}

TruncateContent.propTypes = {
  children: PropTypes.node.isRequired,
  lines: PropTypes.number.isRequired,
};
