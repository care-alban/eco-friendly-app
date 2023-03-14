import PropTypes from 'prop-types';

import styled from 'styled-components';

export default function Section({ id, sx, children }) {
  const SectionSlyte = styled.section`
    margin-bottom: 2rem;
    ${sx}

    &:not(:first-child) {
      border-top: 1px solid var(--color-divider);
      padding-top: 2rem;
    }
  `;

  return <SectionSlyte id={id}>{children}</SectionSlyte>;
}

Section.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  sx: PropTypes.string,
};

Section.defaultProps = {
  id: '',
  sx: '',
};
