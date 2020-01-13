export default (errors, errorPath) => errors.find(({ path }) => (new Set(path)).has(errorPath));
