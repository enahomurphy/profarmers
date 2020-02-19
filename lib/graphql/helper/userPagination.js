import get from 'lib/utils/get';

const usePagination = (fetchMore, data) => () => {
  let query = {};

  if (data.query) {
    query = { query: data.query };
  }

  if (fetchMore) {
    fetchMore({
      ...query,
      variables: {
        page: data.nextPage,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const [mainField, path] = data.path.split('.');

        const newData = get(fetchMoreResult, mainField, {});
        const previousData = get(prev, data.path, {});
        return Object.assign(
          {},
          prev,
          {
            [mainField]: {
              ...newData,
              [path]: [...previousData, ...newData[path]],
            },
          },
        );
      },
    });
  }
};

export default usePagination;
