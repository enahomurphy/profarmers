import React, { useState } from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './modal.css';

const ModalWrapper = styled(Modal)`
  .ant-modal {
    top: 0;
  }

  @media (max-width: 480px) {
    .ant-modal {
      top: 0
    }
  }
`;

const ModalComponent = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const handleCancel = () => {
    setVisible(false);
    router.push('/feed');
  };

  return (
    <div>
      <ModalWrapper
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        bodyStyle={{ padding: 0, height: '100%' }}
        width={904}
      >
        {children}
      </ModalWrapper>
    </div>
  );
};

ModalComponent.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ModalComponent;
