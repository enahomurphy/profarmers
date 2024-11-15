import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm, Controller } from 'react-hook-form';
import {
  Form, Input, Button, Select, Row, Col,
} from 'antd';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import userGQL from 'lib/graphql/user';
import get from 'lib/utils/get';
import WithLabel from 'components/Form/WithLabels';
import getErrors from 'lib/errors';
import AvatarUpload from './AvatarUpload';

const CompleteProfileForm = ({ fullName, profileImage }) => {
  const [updateUser] = useMutation(userGQL.query.UPDATE_USER);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(profileImage);
  const route = useRouter();

  const {
    handleSubmit, control, errors, setError,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await updateUser({ variables: { payload: { ...values, profileImage: imageURL } } });
      route.push('/');
    } catch (error) {
      const formErrors = getErrors(error, 'updateUser');
      if (formErrors.length) {
        setError(formErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <Row style={{ margin: '30px 0' }} type="flex" align="middle" justify="center">
        <AvatarUpload onChange={setImageURL} defaultImage={imageURL} />
      </Row>
      <Row gutter={16}>
        <Col md={4} lg={4}>
          <WithLabel errors={get(errors, 'salutation.message', '')} label="salutation">
            <Controller
              as={(
                <Select>
                  <Select.Option value="mr">Mr</Select.Option>
                  <Select.Option value="mrs">Mrs.</Select.Option>
                  <Select.Option value="miss">Miss.</Select.Option>
                </Select>
              )}
              name="salutation"
              type="select"
              control={control}
              rules={{
                required: 'Please Select a valid salutation',
              }}
            />
          </WithLabel>
        </Col>
        <Col md={20} lg={20}>
          <WithLabel errors={get(errors, 'fullName.message', '')} label="full name">
            <Controller
              as={<Input />}
              name="fullName"
              type="text"
              control={control}
              defaultValue={fullName}
              rules={{
                required: 'Please Enter full name',
                pattern: {
                  value: /^[A-Za-z]{2,}\s+[a-zA-Z]{2,}$/gmi,
                  message: 'Enter your full name and last name ie (john doe)',
                },
              }}
            />
          </WithLabel>
        </Col>
      </Row>
      <WithLabel errors={get(errors, 'phone.message', '')} label="phone">
        <Controller
          as={<Input />}
          name="phone"
          type="phone"
          control={control}
          rules={{
            required: 'Please Enter a phone number',
          }}
        />
      </WithLabel>
      <WithLabel errors={get(errors, 'bio.message', '')} label="bio">
        <Controller
          as={<Input.TextArea rows="4" />}
          name="bio"
          type="textarea"
          control={control}
          rules={{
            required: 'Please Enter a phone number',
          }}
        />
      </WithLabel>
      <WithLabel errors={get(errors, 'occupation.message', '')} label="occupation">
        <Controller
          as={<Input />}
          name="occupation"
          type="text"
          control={control}
          rules={{
            required: 'Please enter your occupation',
          }}
        />
      </WithLabel>
      <WithLabel errors={get(errors, 'personal.message', '')} label="what best describes you?">
        <Controller
          as={(
            <Select>
              {
                [
                  { label: 'farmer', value: 'farmer' },
                  { label: 'investor', value: 'investor' },
                  { label: 'hobbyist (looking too understand farming?)', value: 'hobbyist' },
                  { label: 'marketer', value: 'marketer' },
                  { label: 'other', value: 'other' },
                ].map(({ label, value }) => (
                  <Select.Option key={value} value={value}>{label}</Select.Option>
                ))
              }
            </Select>
          )}
          name="personal"
          type="select"
          control={control}
          rules={{
            required: 'Please Enter a phone number',
          }}
        />
      </WithLabel>
      <Button
        style={{ width: '100%', height: '50px' }}
        type="primary"
        htmlType="submit"
        className="login-form-button"
        loading={loading}
      >
        Complete Profile
      </Button>
    </Form>
  );
};

CompleteProfileForm.propTypes = {
  fullName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};

export default CompleteProfileForm;
