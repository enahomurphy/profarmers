import get from 'lib/utils/get';
import getErrorByPath from './getErrorByPath';
import getFormErrors from './getFormErrors';


export default (error, path) => {
  const errors = get(error, 'networkError.result.errors', []);
  return {
    message: get(getErrorByPath(errors, path), 'message', ''),
    formErrors: getFormErrors(errors, path),
  };
};
