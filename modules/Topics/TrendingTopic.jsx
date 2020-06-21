import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import { Typography } from 'antd';

import 'swiper/css/swiper.css';

import TopicCard from 'components/List/Cards/TopicCard';

const SwiperWrapper = styled(Swiper)`
`;

const TrendingTopicSection = styled.section`
  margin: 30px 0;
  height: 240px;
  margin: 40px auto;
  width: 100%;

  .swiper-container {
    padding: 20px 0px;
  }
`;

const TrendingTopic = ({ topics, loading }) => {
  const params = {
    spaceBetween: 24,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
  };

  return (
    <TrendingTopicSection>
      <Typography.Title style={{ fontSize: '20px', marginLeft: '50px' }}>
        Trending Topics
      </Typography.Title>
      {
        topics.length && (
          <SwiperWrapper {...params}>
            {
              topics.map(topic => (
                <div key={topic.id}>
                  <TopicCard
                    {...topic}
                    details={topic.body}
                    loading={loading}
                  />
                </div>
              ))
            }
          </SwiperWrapper>
        )
      }

    </TrendingTopicSection>
  );
};

TrendingTopic.propTypes = {
  topics: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TrendingTopic;
