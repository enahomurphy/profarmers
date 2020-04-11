import React, { useState } from 'react';
import { AutoComplete, Icon, Input } from 'antd';
import styled from 'styled-components';
import SearchTabs from './SearchTabs';

import './Search.css';

const { Option } = AutoComplete;

const AutoWrapper = styled(AutoComplete)`
  .ant-select-show-search, .ant-select-auto-complete, .ant-select, .ant-select-combobox, .ant-select-enabled, .ant-select-allow-clear {
    width: 100%;
  }
  
  .ant-input-affix-wrapper .ant-input:not(:first-child), .ant-select-dropdown-menu-item .ant-select-dropdown-menu-item-selected {
    padding-left: 68px;
  }

  .ant-input-affix-wrapper
  .ant-input-prefix :not(.anticon),
  .ant-input-affix-wrapper
  .ant-input-suffix :not(.anticon) {
    fill: green;
    margin-left: 24px;
  }
  
  @media screen and (max-width: 480px) {

    .ant-input-affix-wrapper .ant-input:not(:first-child), .ant-select-dropdown-menu-item .ant-select-dropdown-menu-item-selected {
      padding-left: 40px;
    }
  
    .ant-input-affix-wrapper
    .ant-input-prefix :not(.anticon),
    .ant-input-affix-wrapper
    .ant-input-suffix :not(.anticon) {
      fill: green;
      margin-left: 0;
    }
  }
`;

const availableSearch = [
  { type: 'forum', value: 'Racing car sprays burning fuel into crowd.', url: '' },
  { type: 'forum', value: 'Japanese princess to wed commoner.', url: '' },
  { type: 'topic', value: 'Australian walks 100km after outback crash.', url: '' },
  { type: 'people', value: 'Man charged over missing wedding girl.', url: '' },
  { type: 'topic', value: 'Los Angeles battles huge wildfires.', url: '' },
  { type: 'forum', value: 'Test test test', url: '' },
];

const Complete = () => {
  const [dataResult, setDataResult] = useState([]);
  const [currentValue, setCurrentValue] = useState('');
  const [tabData, setTabData] = useState([]);


  const handleSearch = (value) => {
    if (!value) {
      setCurrentValue(value);
      setDataResult([]);
      return;
    }

    const result = availableSearch
      .filter(current => current.value.toLowerCase().indexOf(value.toLowerCase()) > -1);
    setCurrentValue(value);
    setDataResult([...result, { value, type: '', url: '' }]);
  };

  const selectAction = (value) => {
    if (!value) return;
    setCurrentValue(value);
    const data = availableSearch
      .filter(current => current.value.toLowerCase().indexOf(value.toLowerCase()) > -1);
    setTabData(data);
  };

  const children = dataResult
    .map((res, idx, arr) => {
      if ((arr.length - 1) === idx) {
        return (
          <Option key={res.value} label={res.value}>
            {res.value}
            <Icon type="search" style={{ marginLeft: 10, color: 'green', fontSize: 12 }} />
          </Option>
        );
      }
      return (
        <Option key={res.value} label={res.value}>
          {res.value}
          <span style={{
            background: '#488B49',
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 8,
            marginLeft: 13,
          }}
          >
            {res.type}
          </span>
        </Option>
      );
    });
  return (
    <div>
      <AutoWrapper
        allowClear={true}
        onSearch={handleSearch}
        dataSource={children || []}
        onSelect={selectAction}
        value={currentValue}
        optionLabelProp="label"
      >
        <Input style={{ height: 50.5 }} prefix={<Icon type="search" className="certain-category-icon" />} />
      </AutoWrapper>
      { tabData.length ? <SearchTabs data={tabData} /> : '' }
    </div>
  );
};

export default Complete;
