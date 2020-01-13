import get from 'lib/utils/get';

const formatFormErrors = (error) => {
  const formattedErrors = get(error, 'errors', []).reduce((acc, value) => {
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

export const getAllFormsError = (errors) => {
  if (!errors || !errors.length) {
    return {};
  }

  const paths = {};

  errors.forEach((error) => {
    if (get(error, 'extensions.code') === 'yup-error') {
      const path = get(error, 'path')[0];
      paths[path] = formatFormErrors(error);
    }
  });

  return paths;
};

const getFormErrors = (errors, errorPath) => get(getAllFormsError(errors), errorPath, []);

export default getFormErrors;
