import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import 'react-quill/dist/quill.snow.css';

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
];

const modules = {
  toolbar: toolbarOptions,
  clipboard: {
    matchVisual: false,
  },
};

const EditorContainer = styled(ReactQuill)`
  border: none;

  .ql-container {
    height: 180px;
  }
`;

const Editor = ({ onChange, placeholder }) => {
  const [text, seText] = useState('');
  const quill = useRef(null);

  const onchange = (content, delta) => {
    onChange(delta);
    seText(content, delta);
  };

  return (
    <div className="text-editor">
      <EditorContainer
        ref={quill}
        value={text}
        onChange={onchange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        theme="snow"
        imageHandler={(_, hello) => {
          console.info('I was called', hello);
        }}
      />
    </div>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Editor;
