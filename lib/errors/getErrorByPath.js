export default (errors, errorPath) => errors.find(({ path }) => path.includes(errorPath));
