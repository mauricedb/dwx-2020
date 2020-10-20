// Based on https://gist.github.com/ryanflorence/e10cc9dbc0e259759ec942ba82e5b57c

import React from 'react';
import {
  Link,
  LinkProps,
  matchPath,
  NavLink,
  NavLinkProps,
  useLocation,
} from 'react-router-dom';

export function createFetchResource(mapKeyToUrl = (key: string) => key) {
  return createResource(async (key) => {
    const url = mapKeyToUrl(key);
    const rsp = await fetch(url);

    if (!rsp.ok) {
      throw new Error(rsp.statusText);
    }

    return await rsp.json();
  });
}

export function createResource(getPromise: (key: string) => Promise<unknown>) {
  let cache: { [key: string]: unknown } = {};
  let inflight: { [key: string]: Promise<unknown> } = {};
  let errors: { [key: string]: unknown } = {};

  function load(key: string) {
    inflight[key] = getPromise(key)
      .then((val) => {
        delete inflight[key];
        cache[key] = val;
      })
      .catch((error) => {
        errors[key] = error;
      });
    return inflight[key];
  }

  function preload(keys: string | string[]) {
    new Array<string>().concat(keys).forEach((key) => {
      if (cache[key] !== undefined || inflight[key]) return;
      load(key);
    });
  }

  function read<T = unknown>(key: string): T {
    if (cache[key] !== undefined) {
      return cache[key] as T;
    } else if (errors[key]) {
      throw errors[key];
    } else if (inflight[key]) {
      throw inflight[key];
    } else {
      throw load(key);
    }
  }

  function clear(keys?: string | string[]) {
    if (keys) {
      new Array<string>().concat(keys).forEach((key) => {
        delete cache[key];
      });
    } else {
      cache = {};
    }
  }

  type ResourceLinkProps = { cacheKeys: string | string[] } & LinkProps;

  function ResourceLink({ cacheKeys, ...props }: ResourceLinkProps) {
    const location = useLocation();
    const _preload = () => preload(cacheKeys);
    const _clear = () => {
      if (typeof props.to === 'string') {
        const activeRoute = !!matchPath(location.pathname, props.to);

        if (!activeRoute) {
          return clear(cacheKeys);
        }
      }
    };
    return (
      <Link
        onMouseEnter={_preload}
        onMouseLeave={_clear}
        onFocus={_preload}
        onBlur={_clear}
        {...props}
      />
    );
  }

  type ResourceNavLinkProps = { cacheKeys: string | string[] } & NavLinkProps;

  function ResourceNavLink({ cacheKeys, ...props }: ResourceNavLinkProps) {
    const location = useLocation();

    const _preload = () => preload(cacheKeys);
    const _clear = () => {
      if (typeof props.to === 'string') {
        const activeRoute = !!matchPath(location.pathname, props.to);

        if (!activeRoute) {
          return clear(cacheKeys);
        }
      }
    };

    return (
      <NavLink
        onMouseEnter={_preload}
        onMouseLeave={_clear}
        onFocus={_preload}
        onBlur={_clear}
        {...props}
      />
    );
  }

  return { preload, read, clear, Link: ResourceLink, NavLink: ResourceNavLink };
}
