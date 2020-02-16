import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const CustomLink = React.forwardRef((props, ref) => (
  <Link ref={ref} {...props}>
    <a>
      {props.children}
    </a>
  </Link>
));

CustomLink.propTypes = {
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
};

export default CustomLink;
