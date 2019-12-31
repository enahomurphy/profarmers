import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

const Meta = ({ title }) => (
  <div>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title || ''}</title>
      <meta
        name="description"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      {/* <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" /> */}
      <link rel="icon" href="/static/favicon.ico" />
      {/* <link href="https://fonts.googleapis.com/css?family=Lato:300,400|Source+Sans+Pro:200,300,400" rel="stylesheet" /> */}
      <meta property="og:url" />
      <meta property="og:title" />
      <meta property="og:description" />
      <meta name="twitter:site" />
      <meta name="twitter:card" />
      <meta name="twitter:image" />
      <meta property="og:image" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
  </div>
);

Meta.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Meta;
