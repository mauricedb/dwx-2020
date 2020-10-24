import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './components/Loading';
import Loading from './components/Loading';

import NavBar from './components/NavBar';
const Movies = React.lazy(() => import('./components/Movies'));
const Users = React.lazy(() => import('./components/Users'));
const UserDetails = React.lazy(() => import('./components/UserDetails'));

const App = () => (
  <BrowserRouter>
    <div className="container">
      <NavBar />
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/user/:userId/movie/:movieId">
            <UserDetails />
          </Route>
        </Switch>
      </React.Suspense>
    </div>
  </BrowserRouter>
);

export default App;
