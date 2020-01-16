import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import cookie from 'js-cookie';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  opts: {
    credentials: 'same-orgin',
  },
});

const authLink = setContext((_, { headers }) => {
  const token = cookie.get('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const config = {
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore({}),
};

export default withData(config);
