import styled from 'styled-components';
import PropTypes from 'prop-types';

const Divider = styled.div`
  height: 15px;
  width: 1px;
  border-right: 1px solid #686666;
  display: inline-block;
  margin: ${props => props.margin};
`;


Divider.defaultProps = {
  margin: '0 5px',
};


Divider.propTypes = {
  margin: PropTypes.string,
};


export default Divider;
