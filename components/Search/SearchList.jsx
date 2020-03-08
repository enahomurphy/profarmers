import React, { useState, useEffect } from 'react';
import {
  List,
} from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const ListWrapper = styled.div`
  width: 904px;
  border: 1px solid transparent;
  .ant-list-split .ant-list-item {
    border-bottom: 0;
    padding-left: 68px;
    margin: 0;
    height: 30px;
    font-size: 14px;

    &:hover {
      background: rgba(72, 139, 73, 0.1);
      width: 100%;
      outline: none;
    }
  }

  @media screen and (max-width: 580px) {
    .ant-list-split .ant-list-item {
      padding-top: 5px;
    }
  }

  @media screen and (max-width: 480px) {
    .ant-list-split .ant-list-item {
      padding-top: 5px;
      padding-left: 10px;
    }

    .ant-list-item-meta {
      height: 30px;
    }
  }
`;

const SearchList = ({ items }) => {
  const [state, setState] = useState({
    data: items,
  });
  useEffect(() => {
    setState({ ...state, data: items });
  }, [items]);

  return (
    <div className="demo-infinite-container">
      <ListWrapper>
        <List
          dataSource={state.data}
          bordered={false}
          renderItem={item => (
            <Link href="/feed">
              <a>
                <List.Item key={item.value}>
                  <List.Item.Meta
                    description={item.value}
                  />
                </List.Item>
              </a>
            </Link>
          )}
        />
      </ListWrapper>
    </div>
  );
};

SearchList.propTypes = {
  items: PropTypes.array,
};

SearchList.defaultProps = {
  items: [],
};

export default SearchList;
