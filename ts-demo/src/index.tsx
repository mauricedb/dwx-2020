import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorDisplay error={error} />}
      >
        <App />
      </ErrorBoundary>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
