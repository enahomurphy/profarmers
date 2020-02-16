import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import PropTypes from 'prop-types';

export const login = ({ token }, path = '/', params) => {
  cookie.set('token', token, { expires: 1 });
  Router.push({
    pathname: path,
    query: params,
  });
};

export const auth = (ctx) => {
  const { token } = nextCookie(ctx);
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    } else {
      Router.push('/login');
    }
  }

  return token;
};

export const logout = () => {
  cookie.remove('token');
  window.localStorage.setItem('logout', Date.now());
  window.location.href = '/login';
};

export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        Router.push('/login');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const token = auth(ctx);

    const componentProps = WrappedComponent.getInitialProps
      && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};

export const withUnAuth = (WrappedComponent) => {
  const Wrapper = ({ token, ...props }) => {
    const router = useRouter();

    useEffect(() => {
      if (token) {
        router.push('/');
      }
    }, [router, token]);

    return !token && <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const { token } = nextCookie(ctx);

    const componentProps = WrappedComponent.getInitialProps
      && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  Wrapper.propTypes = {
    token: PropTypes.string,
  };

  return Wrapper;
};

export default withAuthSync;
