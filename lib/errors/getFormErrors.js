import get from 'lib/utils/get';
import getErrorByPath from './getErrorByPath';


export default (errors, errorPath) => {
  const pathError = getErrorByPath(errors, errorPath);

  const formattedErrors = get(pathError, 'errors', []).reduce((acc, value) => {
    const nextError = {
      type: 'required',
      name: value.path,
      message: [value.message],
    };

    const cachedError = acc.get(value.path);
    if (cachedError) {
      cachedError.message.push(value.message);

      return acc;
    }

    acc.set(value.path, nextError);

    return acc;
  }, new Map());

  return Array.from(formattedErrors.values());
};
