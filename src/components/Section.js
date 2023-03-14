import PropTypes from 'prop-types';

import styled from 'styled-components';

export default function Section({ id, children }) {
  return <SectionSlyte id={id}>{children}</SectionSlyte>;
}

Section.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Section.defaultProps = {
  id: '',
};

const SectionSlyte = styled.section`
  margin-bottom: 2rem;

  &:not(:first-child) {
    border-top: 1px solid var(--color-divider);
    padding-top: 2rem;
  }

  &[id='quizz'] {
    background-color: #ffcf33;
    padding: 2rem;
    min-width: 100vw;
    margin-left: calc((100vw - 100%) / -2);
  }
`;
