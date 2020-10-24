// Based on https://gist.github.com/ryanflorence/e10cc9dbc0e259759ec942ba82e5b57c

import React from 'react';
import { Link, matchPath, NavLink, useLocation } from 'react-router-dom';

export function createFetchResource(mapKeyToUrl = (key) => key) {
  return createResource(async (key) => {
    const url = mapKeyToUrl(key);
    const rsp = await fetch(url);

    if (!rsp.ok) {
      throw new Error(rsp.statusText);
    }

    return await rsp.json();
  });
}

export function createResource(getPromise) {
  let cache = {};
  let inflight = {};
  let errors = {};

  function load(key) {
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

  function preload(keys) {
    [].concat(keys).forEach((key) => {
      if (cache[key] !== undefined || inflight[key]) return;
      load(key);
    });
  }

  function read(key) {
    if (cache[key] !== undefined) {
      return cache[key];
    } else if (errors[key]) {
      throw errors[key];
    } else if (inflight[key]) {
      throw inflight[key];
    } else {
      throw load(key);
    }
  }

  function clear(keys) {
    if (keys) {
      [].concat(keys).forEach((key) => {
        delete cache[key];
      });
    } else {
      cache = {};
    }
  }

  function ResourceLink({ cacheKeys, ...props }) {
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

  function ResourceNavLink({ cacheKeys, ...props }) {
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
