import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const UploadContainer = styled(Upload)`
  background: ${({ image }) => (image ? `url(${image})` : '')};
  width: 110px;
  height: 110px;
  border-radius: 100%;
  position: relative;
  background-color: #EFEFEF;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  .ant-upload.ant-upload-select-picture-card {
    border: none;
    background: none;
  }
`;

const UploadButtonContainer = styled.div`
`;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const AvatarUpload = ({ defaultImage, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(defaultImage);

  useEffect(() => {
    setImageURL(defaultImage);
  }, [defaultImage]);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageURL(imageUrl);
        onChange();
        setLoading(false);
      });
    }
  };

  const UploadButton = (
    <UploadButtonContainer>
      { loading && <LoadingOutlined /> }
      <PlusCircleOutlined
        style={{
          fontSize: '26px',
          position: 'absolute',
          bottom: '38%',
          right: '-10px',
        }}
        theme="filled"
      />
    </UploadButtonContainer>
  );

  return (
    <UploadContainer
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      image={imageURL}
    >
      {UploadButton}
    </UploadContainer>
  );
};

AvatarUpload.defaultProps = {
  onChange: () => {},
  defaultImage: '',
};

AvatarUpload.propTypes = {
  onChange: PropTypes.func,
  defaultImage: PropTypes.string,
};

export default AvatarUpload;
