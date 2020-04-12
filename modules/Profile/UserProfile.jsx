import React from 'react';
import {
  Avatar, Button, Icon,
} from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RecentTopics from 'modules/Topics/RecentTopics';
import Layout from 'components/Layout';
import RoundedIcon from 'components/Icons/RoundedIcon';
import ConnectedCard from 'components/List/Cards/ConnectedCard';

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  text-align: center;
  margin: auto;
  margin-top: 40px;
  span {
    margin-right: 65px;

    .count {
      font-weight: 600;
      font-size: 32px;
      line-height: 38px;
      color: #303030;
    }

    .text {
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;

      color: #B6C5D2;
    }
  }
`;

const ConnectionsAndTopicsWrapper = styled.div`
  margin-top: 40px;
  display: flex;

  section {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: #303030;
    width: 45%;

    h5 {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }
  }

  section:nth-child(1) {
    margin-right: 68px;
  }
`;

const ConnectedCardWrapper = styled(ConnectedCard)`
  border: none;
  color: red;
  background: blue;
`;

const UserProfile = ({
  connectionsLoading, topicLoading, userInfo, user, connections, recentTopics, buttonProp,
}) => (
  <Layout page="profile" title="profile">
    <div style={{ margin: '0 auto' }}>
      <Icon style={{ marginLeft: 100 }} type="arrow-left" />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar style={{ display: 'block' }} size={100} icon="user" src={user.profileImage} alt={user.fullName} />
        <Button
          style={{
            width: '120px', height: '40px', borderRadius: 0, marginTop: 30, background: buttonProp.background, color: buttonProp.color,
          }}
        >
          {buttonProp.text}
        </Button>
        <div style={{ display: 'flex', margin: '0 auto', marginTop: 30, justifyContent: 'center' }}>
          <h4 style={{ marginRight: 16, marginLeft: 16, fontSize: 26 }}>{user.fullName}</h4>
          <RoundedIcon type={buttonProp.text === 'Messages' ? 'form' : 'message'} />
        </div>
      </div>
    </div>
    <p style={{
      textAlign: 'center', margin: 'auto 60px', fontSize: 18, lineHeight: '30px', color: '#686666',
    }}
    >
      {user.bio}
    </p>
    <InfoWrapper>
      <span id="topic">
        <div className="count">{userInfo.topicsCount}</div>
        <div className="text">Topics</div>
      </span>
      <span id="discussions">
        <div className="count">{userInfo.disscussionCount}</div>
        <div className="text">Discussions</div>
      </span>
      <span id="connections">
        <div className="count">{userInfo.connectionCount}</div>
        <div className="text">Connections</div>
      </span>
    </InfoWrapper>
    <ConnectionsAndTopicsWrapper>
      <section>
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>Connections</h4>
          <h5>See All</h5>
        </header>
        {
          !connectionsLoading
          && connections.map(conn => <div style={{ marginBottom: 16 }}><ConnectedCardWrapper user={conn} replies={{ totalCount: 300 }} loading={connectionsLoading} /></div>)
        }
      </section>
      <RecentTopics
        title="Recent Topics"
        topics={recentTopics}
        loading={topicLoading}
        hasMore={false}
        endMessage=""
        handleInfiniteOnLoad={() => {}}
        paddingTopBottom={0}
        truncateDetails
      />
    </ConnectionsAndTopicsWrapper>
  </Layout>
);

UserProfile.defaultProps = {
  buttonProp: {
    color: '#fff',
    background: '#488B49',
    text: 'Messages',
  },
};

UserProfile.propTypes = {
  topicLoading: PropTypes.bool.isRequired,
  recentTopics: PropTypes.array.isRequired,
  connectionsLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  buttonProp: PropTypes.object,
};

export default UserProfile;
