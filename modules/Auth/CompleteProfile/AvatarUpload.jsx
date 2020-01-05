import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload, Icon, message } from 'antd';

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

const AvatarUpload = () => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageURL(imageUrl);
        setLoading(false);
      });
    }
  };

  const UploadButton = (
    <UploadButtonContainer>
      {loading && <Icon type="loading" />}
      <Icon
        style={{
          fontSize: '26px',
          position: 'absolute',
          bottom: '38%',
          right: '-10px',
        }}
        theme="filled"
        type="plus-circle"
      />
    </UploadButtonContainer>
  );

  return (
    <UploadContainer
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      image={imageURL}
    >
      {/* {imageURL ? '' : uploadButton} */}
      {UploadButton}
    </UploadContainer>
  );
};

export default AvatarUpload;
