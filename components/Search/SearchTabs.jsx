import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SearchList from './SearchList';

const { TabPane } = Tabs;

const TabWrapper = styled.div`
  width: 100%;
  .ant-tabs-nav-scroll {
    padding-left: 68px;
  }
  .ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane, .ant-tabs .ant-tabs-bottom-content > .ant-tabs-tabpane {
    min-height: 35px;
    max-height: 781px;
  }

  .ant-tabs-top .ant-tabs-ink-bar-animated, .ant-tabs-bottom .ant-tabs-ink-bar-animated {
    width: 50px !important;
    margin-left: 24px;
  }

  inkBar {
    width: 20px;
  }

  @media screen and (max-width: 480px) {
    .ant-tabs-nav-scroll {
      padding-left: 0;
    }
  }
`;

const SearchTabs = ({ data }) => {
  const [tabData, setTabData] = useState({
    forumData: data.filter(item => item.type === 'forum'),
    topicData: data.filter(item => item.type === 'topic'),
    peopleData: data.filter(item => item.type === 'people'),
  });

  useEffect(() => {
    setTabData({
      forumData: data.filter(item => item.type === 'forum'),
      topicData: data.filter(item => item.type === 'topic'),
      peopleData: data.filter(item => item.type === 'people'),
    });
  }, [data]);

  return (
    <TabWrapper>
      <Tabs
        tabBarStyle={{ color: '#A7A7A7' }}
        defaultActiveKey="1"
        size={1}
      >
        <TabPane tab={`Forum (${tabData.forumData.length})`} key="1">
          <SearchList items={tabData.forumData} />
        </TabPane>
        <TabPane tab={`Topic (${tabData.topicData.length})`} key="2">
          <SearchList items={tabData.topicData} />
        </TabPane>
        <TabPane tab={`People (${tabData.peopleData.length})`} key="3">
          <SearchList items={tabData.peopleData} />
        </TabPane>
      </Tabs>
    </TabWrapper>
  );
};

SearchTabs.propTypes = {
  data: PropTypes.array,
};

SearchTabs.defaultProps = {
  data: [],
};

export default SearchTabs;
