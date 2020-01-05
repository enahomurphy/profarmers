import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  opts: {
    credentials: 'same-origin',
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const config = {
  link: authLink.concat(httpLink),
};

export default withData(config);
