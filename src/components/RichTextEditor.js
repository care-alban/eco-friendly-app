import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import ReactQuillCSS from 'react-quill/dist/quill.snow.css';

const StyledReactQuill = styled(ReactQuill)`
  ${ReactQuillCSS}
  .ql-editor {
    min-height: 200px;
  }

  .ql-font-roboto {
    font-family: 'Roboto', sans-serif;
  }
`;

export default function RichTextEditor({ name, placeholder, value, onChange }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  return (
    <StyledReactQuill
      modules={modules}
      placeholder={placeholder}
      theme="snow"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

RichTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

RichTextEditor.defaultProps = {
  placeholder: '',
  value: '',
};
