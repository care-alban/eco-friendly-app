import PropTypes from 'prop-types';

import styled from 'styled-components';

export default function Section({ id, size, children }) {
  return (
    <SectionSlyte id={id} size={size}>
      {children}
    </SectionSlyte>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Section.defaultProps = {
  id: '',
  size: '',
};

const SectionSlyte = styled.section`
  margin-bottom: 2rem;

  &:has(:last-child) {
    margin-bottom: 0;
  }

  &:not(:first-child) {
    border-top: 1px solid var(--color-divider);
    padding-top: 2rem;
  }

  &[id='short-articles'] {
    background-color: var(--color-secondary-main);
  }

  &[id='quizz'] {
    background-color: var(--color-primary-light);
  }

  &[id='short-articles'],
  &[id='quizz'] {
    padding: 2rem;
    min-width: 100vw;
    margin-left: calc((100vw - 100%) / -2);
  }
`;
