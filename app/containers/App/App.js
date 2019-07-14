/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import TicTacToe from 'containers/TicTacToe/Loadable';
import Header from 'components/Header';
import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="React.js Boilerplate"
    >
      <meta name="description" content="Tic tac toe" />
    </Helmet>

    <Switch>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/" component={TicTacToe} />
      <Route path="" component={NotFoundPage} />
    </Switch>

  </div>
);

export default App;
